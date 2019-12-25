import {
    Authenticated,
    BodyParams,
    Controller,
    Delete,
    Get,
    PathParams,
    Post,
    Put,
    Required,
    Status
} from "@tsed/common";
import {NotFound} from "ts-httpexceptions";
import {CMDService} from "../../services/cmd/cmd";
import "../../extensions";

/**
 * Add @Controller annotation to declare your class as Router controller.
 * The first param is the global path for your controller.
 * The others params is the controller dependencies.
 */
@Controller("/interfaces")
export default class InterfacesCtrl {

    constructor(private cmdService: CMDService) {

    }

    @Get("/:name")
    async get(@Required() @PathParams("name") name: string): Promise<any> {

        let output = this.cmdService.man(name)
        .then( (man) => 
        //"<pre>" + escapeHtml(JSON.stringify(man,(k,v) => k === "parent" ? undefined : v )) + "</pre>\n\n" +
        "<div>" + escapeHtml(JSON.stringify(man,(k,v) => k === "parent" ? undefined : v )) + "</div>" +
        "<table style='width:100%'><tr><td><pre>" +
        escapeHtml(man.toString()) +     "</pre></td>    <td style='vertical-align: top;'><pre>" +
        escapeHtml(man.manString)  +     "</pre></td></tr>  </tbody>");

        return output;
    }

    @Get("/")
    async getAllCalendars(): Promise<string[]> {
        return this.cmdService.list();
    }
}

function escapeHtml(unsafe: string) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }