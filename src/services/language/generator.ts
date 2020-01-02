/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
/**
 * Natural Language base class
 * ------------------------------------------------------------
 * @name NaturalLanguage
 * 
 * @constructor
 * @param {Array} data - a list of inputs
*/
let NaturalLanguage;
exports.NaturalLanguage = 
(NaturalLanguage = (function() {
  let global = undefined;
  let _ = undefined;
  let config = undefined;
  let sentences = undefined;
  let capitalize = undefined;
  let replaceStr = undefined;
  let replaceCombinedStr = undefined;
  let setAttrs = undefined;
  let getDifference = undefined;
  let getDisplayInfo = undefined;
  let calculatePriority = undefined;
  let calculateLevel = undefined;
  let calculateType = undefined;
  let selectData = undefined;
  let groupData = undefined;
  let getSimpleSentenceList = undefined;
  let buildSimpleSentence = undefined;
  let addSimpleSentence = undefined;
  let getCompoundSentenceList = undefined;
  let buildCompoundSentence = undefined;
  let buildSentences = undefined;
  NaturalLanguage = class NaturalLanguage {
    static initClass() {
  
      /**
       * ------------------------------------------------------------
       * Prepare resource
       * ------------------------------------------------------------
      */
      global    = null;
      _         = null;//require("underscore");
      config    = null;//require("./../resources/config.json");
      sentences = null;//require("./../resources/sentences.json");
  
      /**
       * ------------------------------------------------------------
       * HELPER FUNCTION
       * ------------------------------------------------------------
      */
  
  
      /**
       * Change the first character of the string to capital
       * ------------------------------------------------------------
       * @name capitalize
       * @param  {string} data
       * @return {string} capitalized string
      */
  
      capitalize = data => data.charAt(0).toUpperCase() + data.slice(1);
  
  
      /**
       * Replace sentence pattern with string in data object
       * (single sentence, no capitalization or full stop)
       * ------------------------------------------------------------
       * @name replaceStr
       * @param  {array}  patterns - array of sentences
       * @param  {object} data - displayInfo object
       * @return {string} final sentence
      */
  
      replaceStr = function(patterns, data) {
        let pattern;
        if (global.random) {
          pattern = _.sample(patterns);
        } else {
          pattern = patterns[0];
        }
        _.each(data, (item, key) => pattern = pattern.replace(`{${key}}`, item));
        return pattern;
      };
  
  
      /**
       * Replace sentence pattern with string in data object
       * (combined sentence, with capitalization and full stop)
       * ------------------------------------------------------------
       * @name replaceCombinedStr
       * @param  {array}  patterns - array of sentences
       * @param  {array}  data - array of displayInfo object
       * @return {string} final sentence
      */
  
      replaceCombinedStr = function(patterns, data) {
        let pattern;
        if (global.random) {
          pattern = _.sample(patterns);
        } else {
          pattern = patterns[0];
        }
        _.each(data, (items, i) => _.each(items, (item, key) => pattern = pattern.replace(`{${key}.${i}}`, items[key])));
        return pattern;
      };
  
  
      /**
       * ------------------------------------------------------------
       * METHOD LIST
       * ------------------------------------------------------------
      */
  
  
      /**
       * Add more required attributes
       * ------------------------------------------------------------
       * @name setAttrs
       * @param  {array}  data - array of inputs
       * @return {Object} new data with more attributes
       * @private
      */
  
      setAttrs = function(data) {
        _.each(data, function(item, i) {
          if (item.options !== undefined) {
            // item.options = _.extend _.clone(config.default), item.options
            item.options = _.defaults(item.options, config.default);
          } else {
            item.options = {
              "priority": {
                "init": 1,
                "negativeFactor": 20,
                "positiveFactor": 100
              },
              "level": {
                "threshold": 0.09,
                "sensitiveness": 1
              }
            };
          }
          if (!item.dataType) { item.dataType     = "default"; }
  
          // Custom for more attributes
          if (global.dataConfig[item.dataType] && global.dataConfig[item.dataType].setAttrs) {
            item = global.dataConfig[item.dataType].setAttrs(item);
          }
  
          // Default attributes
          if (typeof item.alwaysShow === "undefined") { item.alwaysShow   = false; }
          if (!item.contentGroup) { item.contentGroup = "default"; }
          if (!item.sentenceType) { item.sentenceType = "default"; }
          if (item.precision === "undefined") { item.precision    = 0; }
          item.difference   = getDifference(item);
          item.displayInfo  = getDisplayInfo(item);
          item.priority     = calculatePriority(item);
          item.level        = calculateLevel(item);
          return item.levelType    = calculateType(item.level);
        });
  
        return data;
      };
  
  
      /**
       * Get the difference between old value and current value
       * ------------------------------------------------------------
       * @name getDifference
       * @param  {object}        data
       * @return {number/string} difference value or 'na' if there is no oldData
       * @private
      */
  
      getDifference = function(data) {
        // Override
        if (global.dataConfig[data.dataType] && global.dataConfig[data.dataType].getDifference) {
          return global.dataConfig[data.dataType].getDifference(data);
        }
  
        // Default
        if ((typeof data.oldData !== "undefined") && (typeof data.oldData === "number")) {
          return data.newData - data.oldData;
        } else { 
          return "na";
        }
      };
  
  
      /**
       * Prepare strings required to show in the sentence
       * ------------------------------------------------------------
       * @name getDisplayInfo
       * @param  {object} data
       * @return {object} information required to display in the sentence
       * @private
      */
  
      getDisplayInfo = function(data) {
        // Override
        if (global.dataConfig[data.dataType] && global.dataConfig[data.dataType].getDisplayInfo) {
          return global.dataConfig[data.dataType].getDisplayInfo(data);
        }
  
        // Default
        const result: any = {};
        result.title = data.title.toLowerCase();
      
        if (typeof data.oldData !== "undefined") {
          if (typeof data.oldData === "number") {
            result.oldData    = data.oldData.toFixed(data.precision);
          } else {
            result.oldData = data.oldData.toLowerCase();
          }
          if (typeof data.difference === "number") {
            result.difference = Math.abs(data.difference).toFixed(data.precision);
          }
        }
        if (typeof data.newData === "number") {
          result.newData = data.newData.toFixed(data.precision);
        } else {
          result.newData = data.newData.toLowerCase();
        }
      
        return result;
      };
  
  
      /**
       * Calculate the priority of change
       * ------------------------------------------------------------
       * @name calculatePriority
       * @param  {object} data
       * @return {number} new priority
       * @private
      */
  
      calculatePriority = function(data) {
        // Override
        let newPriority;
        if (global.dataConfig[data.dataType] && global.dataConfig[data.dataType].calculatePriority) {
          return global.dataConfig[data.dataType].calculatePriority(data);
        }
  
        // Default
        const priorityConfig = data.options.priority;
  
        if (data.difference === "na") {
          return priorityConfig.init;
        } else if (data.difference > 0) {
          newPriority = priorityConfig.init +
                        (priorityConfig.positiveFactor * data.difference);
        } else {
          newPriority = priorityConfig.init +
                        (priorityConfig.negativeFactor * Math.abs(data.difference));
        }
  
        return parseInt(newPriority.toFixed(0), 10);
      };
  
  
      /**
       * Calculate the intesity of change
       * ------------------------------------------------------------
       * @name calculateLevel
       * @param  {object} data
       * @return {number} intensity of the change
       * @private
      */
  
      calculateLevel = function(data) {
        // Override
        let level;
        if (global.dataConfig[data.dataType] && global.dataConfig[data.dataType].calculateLevel) {
          return global.dataConfig[data.dataType]
                 .calculateLevel(data.difference, data.options.level);
        }
  
        // Default
        const levelConfig = data.options.level;
  
        if (data.difference === "na") {
          level = "na";
        } else {
          const absoluteDifference = Math.abs(data.difference);
          if (absoluteDifference < levelConfig.threshold) {
            level = 0;
          } else {
            level = Math.ceil(data.difference / levelConfig.sensitiveness);
            if (level > 3) { level = 3; }
            if (level < -3) { level = -3; }
          }
        }
        return level;
      };
  
  
      /**
       * Calculate the type of intesity
       * ------------------------------------------------------------
       * @name calculateType
       * @param  {number} level
       * @return {string} levelType
       * @private
      */
  
      calculateType = function(level) {
        if (level > 0) {
          return "positive";
        } else if (level < 0) {
          return "negative";
        } else if (level === "na") {
          return "na";
        } else {
          return "neutral";
        }
      };
  
  
      /**
       * Select number of data to display and sort by priority
       * ------------------------------------------------------------
       * @name selectData
       * @param  {array}  data - array of data split into two groups: alwaysShow and sortedData
       * @param  {number} nData - number of data to show
       * @return {array}  selected, sorted data by priority
       * @private
      */
  
      selectData = function(data, nData) {
        const groupedData = groupData(data);
        let result = groupedData.alwaysShow;
        if(nData === -1) {
          return result.concat(groupedData.sortedData);
        }
        if (result.length < nData) {
          const nRemaining = nData - result.length;
          result = result.concat(groupedData.sortedData.slice( 0, nRemaining ));
        }
        result.sort((a, b) => b.priority - a.priority);
  
        return result;
      };
  
  
      /**
       * Group data by alwaysShow attr and sort the group by priority
       * ------------------------------------------------------------
       * @name groupData
       * @param  {array} data - array of data
       * @return {array} data split into two groups, alwaysShow and sortedData
       * @private
      */
  
      groupData = function(data) {
        // Remove hidden items
        data = _.filter(data, item => !item.hidden);
  
        data = _.groupBy(data, "alwaysShow");
        data.sortedData = [];
        data.alwaysShow = [];
  
        if (data.false) {
          data.false.sort((a, b) => b.priority - a.priority);
          data.sortedData = data.false;
        }
        if (data.true) { data.alwaysShow = data.true; }
  
        return data;
      };
  
  
      /**
       * Get a valid list of sentences for random selecting
       * ------------------------------------------------------------
       * @name getSimpleSentenceList
       * @param  {object} data - data object
       * @param  {array}  simpleSentences - sentences from all types
       * @return {array}  array of valid sentences
       * @private
      */
  
      getSimpleSentenceList = function(data, simpleSentencese) {
  
        // Override
        if (global.sentenceConfig[data.sentenceType] 
          && global.sentenceConfig[data.sentenceType].getSimpleSentenceList) {
            return global.sentenceConfig[data.sentenceType]
                   .getSimpleSentenceList(data, simpleSentencese);
          }
  
        // Default
        if (typeof data.oldData === "undefined") { // No oldData
          if ((typeof sentences.simpleSentences[data.sentenceType] !== "undefined") 
            && (typeof sentences.simpleSentences[data.sentenceType]["na"] !== "undefined")) {
              return sentences.simpleSentences[data.sentenceType]["na"];
          } else {
            return sentences.simpleSentences["default"]["na"];
          }
        } else {
          if ((typeof sentences.simpleSentences[data.sentenceType] !== "undefined") 
            && (typeof sentences.simpleSentences[data.sentenceType][data.levelType] !== "undefined")) {
              if (typeof sentences.simpleSentences[data.sentenceType][data.levelType][data.level.toString()] !== "undefined") {
                return sentences.simpleSentences[ data.sentenceType ][ data.levelType ][ data.level.toString() ];
              } else {
                return sentences.simpleSentences[ data.sentenceType ][ data.levelType ];
              }
          } else {
            return sentences.simpleSentences["default"][ data.levelType ][ data.level.toString() ];
          }
        }
      };
  
  
      /**
       * Group data into contentGroups and loop through each
       * contentGroup to create sentence(s)
       * ------------------------------------------------------------
       * @name buildSimpleSentence
       * @param  {object} data - data object
       * @return {array}  array of sentences
       * @private
      */
  
      buildSimpleSentence = function(data) {
        const simpleSentences = getSimpleSentenceList(data, sentences.simpleSentences);
        return replaceStr(simpleSentences, data.displayInfo);
      };
  
  
      /**
       * Add simple sentence into the data object
       * ------------------------------------------------------------
       * @name addSimpleSentence
       * @param  {array} array of data to generate simple sentences
       * @return {array} array of data with sentence attribute inserted
       * @private
      */
  
      addSimpleSentence = function(data) {
        for (let i in data) {
          data[i].displayInfo.sentence = buildSimpleSentence(data[i]);
        }
        return data;
      };
  
      /**
      * Get a valid list of compound sentences
      * ------------------------------------------------------------
      * @name getCompoundSentenceList
      * @param  {object} data - data object
      * @param  {array}  compoundSentences - sentences from all types
      * @return {array}  array of valid sentences
      * @private
      */
  
      getCompoundSentenceList = function(data, compoundSentences) {
        // Override
        if(global.sentenceConfig[data.sentenceType] && global.sentenceConfig[data.sentenceType].getCompoundSentenceList) {
          return global.sentenceConfig[data.sentenceType].getCompoundSentenceList(data, compoundSentences);
        }
        // Default
        if (sentences.compoundSentences[data.sentenceType] !== undefined) {
          return compoundSentences[data[0].sentenceType];
        } else {
          return compoundSentences.default;
        }
      };
  
      /**
       * Combine two simple sentencese that are in the same sentenceGroup
       * ------------------------------------------------------------
       * @name buildCompoundSentence
       * @param  {array}  array of one or two data objects to combine
       * @return {string} a combine sentence
       * @private
      */
  
      buildCompoundSentence = function(data) {
        const types = _.pluck(data, "levelType");
        const type = types.join("_");
  
        const moreDisplayInfo = _.pluck(addSimpleSentence(data), "displayInfo");
        const compoundSentences = getCompoundSentenceList(data, sentences.compoundSentences);
        const selectedSentences = _.find(compoundSentences, group => _.contains(group.type, type));
        return capitalize(replaceCombinedStr( selectedSentences.sentences, moreDisplayInfo ));
      };
  
  
      /**
       * Group data into contentGroups and loop through each
       * contentGroup to create sentence(s)
       * ------------------------------------------------------------
       * @name buildSentences
       * @param  {array} data - array sorted by priority but not grouped
       * @return {array} array of sentences
       * @private
      */
  
      buildSentences = function(data) {
        const result = [];
        data = _.groupBy(data, "contentGroup");

        // for group of data
        _.each(data, function(group) {
          if (group.length > 2) {
            let i = 0;
            return (() => {
              const result1 = [];
              while (i < group.length) {
                if ((i + 1) === group.length) {
                  result.push(buildCompoundSentence([ group[i] ]));
                } else {
                	result.push(buildCompoundSentence([ group[i], group[parseInt(i+"")+1] ]));
                }
                result1.push(i = i + 2);
              }
              return result1;
            })();
          } else {
            return result.push(buildCompoundSentence(group));
          }
        });
  
        return result;
      };
    }

    private data;
    private dataConfig     = {};
    private sentenceConfig = {};
    private random         = true;
    
    constructor(data) {
      this.data           = data;
      global          = this;
    }

    addType(title, func) {
      if (func == null) { func = {}; }
      if (this.dataConfig[title]) {
        return this.dataConfig[title] = _.extend(this.dataConfig[title], func);
      } else { 
        return this.dataConfig[title] = func;
      }
    }

    addSentence(title, func = null) {
      if (this.sentenceConfig[title]) {
        return this.sentenceConfig[title] = _.extend(this.sentenceConfig[title], func);
      } else { 
        return this.sentenceConfig[title] = func;
      }
    }

    /**
     * Generate sentences from a list of data
     * ------------------------------------------------------------
     * @name NaturalLanguage.generate
     * @param {number} nData - number of sentences to generate
     * @return {String/Number/Object/Function/Boolean} desc
     * @public
    */
    generate(nData, random) {
      if (nData == null) { nData = -1; }
      if (random == null) { random = true; }
      this.random = random;
      let data = setAttrs(this.data);
      data = selectData(data, nData);
      const result = buildSentences(data);
      // return data
      // for i of data
      //   console.log data[i].title, ": ", data[i].priority
      return result.join(" ");
    }

    debug(nData, random) {
      let result;
      if (nData == null) { nData = -1; }
      if (random == null) { random = true; }
      this.random = random;
      return setAttrs(this.data);
      let data = setAttrs(this.data);
      data = selectData(data, nData);
      return result = buildSentences(data);
    }
  };
  NaturalLanguage.initClass();
  return NaturalLanguage;
})());

// signType = {
//   words: {
//     "Debt Level": {
//       "-": "0",
//       "Low .*": "+1",
//       "No .*": "+2",
//       "High .* in the past 5 years": "-1",
//       "High .*": "-2",
//       "Very High .*": "-3"
//     },
//     "Share Repurchase": {
//       "-": "0",
//       "Every year": "+2"
//     },
//     "CapEx": {
//       "-": "0",
//       "Very Low": "+2",
//       "Very High": "-2"
//     }
//   },
//   setAttrs: (data) ->
//     data.newScore = @getScore(data.title, data.newData)
//     if(typeof data.oldData != "undefined")
//       data.oldScore = @getScore(data.title, data.oldData)
//     if(data.newScore == '0')
//       data.hidden = true
//     data

//   getDisplayInfo: (data) ->
//     precision = data.precision
//     result = {}
//     result.title = data.title.toLowerCase()
//     result.title = "CapEx" if data.title == "CapEx"
//     result.newData = data.newData.toLowerCase()
//     if(typeof data.oldData != "undefined")
//       result.oldData = data.oldData.toLowerCase()
//     result

//   getScore: (title, data) ->
//     for item of @words[title]
//       pattern = new RegExp(item, "g");
//       if pattern.test(data)
//         return @words[title][item]
//     return null

//   getDifference: (data) ->
//     if(typeof data.oldData != "undefined")
//       parseInt(data.newScore) - parseInt(data.oldScore)
//     else
//       "na"  
// }
// # String with custom functions


// NL = new NaturalLanguage [{
//   "title": "Share Repurchase",
//   "oldData": "-",
//   "newData": "Every year",
//   "dataType": "sign"
// }]
// NL.addType "sign", signType
// # String with custom functions + oldData
// console.log NL.generate(-1, false)

  // adef = {
  //   'key1': 'value1',
  //   'key2': 'value2'
  // }
  // aover ={
  //   'key1': 'value1override',
  //   'key3': 'value3'
  // }
  // console.log _.extend(adef, aover)
  // console.log adef
  // console.log aover