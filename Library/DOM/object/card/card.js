import DOM from "@DOMPath/DOM/Classes/dom"
import CardContent from "./cardContent"

export default class Card {
    constructor(content = [], { style = {}, type = [] } = {}, other = {}) {
        return new DOM({
            new: "div",
            class: ["card", ...type],
            style,
            content: (typeof content === "string" ? new CardContent(content) : content),
            ...other,
        })
    }
}
