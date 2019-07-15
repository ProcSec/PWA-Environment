import DOM from "@DOMPath/DOM/Classes/dom"
import ucFirst from "@Core/Tools/transformation/text/ucFirst"
import Navigation from "@Core/Services/navigation"
import { CardList } from "../object/card"
import { TwoSidesWrapper, Icon } from "../object"

export default class SettingsActLink {
    constructor([act, sign, custom = false]) {
        if (typeof act === "string") act = [act]
        sign = sign || (typeof act === "string" ? ucFirst(act[0]) : "(...)")
        const signElement = new DOM({ new: "div", content: sign })
        return new CardList([
            {
                content: new TwoSidesWrapper(signElement, new Icon((custom || "chevron_right"), { marginLeft: "15px" })),
                handler: (typeof act === "function"
                    ? act
                    : () => { Navigation.hash = { module: "settings", params: act } }),
                object: [
                    {
                        name: "changeSign",
                        handler(n) { signElement.clear(n) },
                    },
                ],
            },
        ], true)
    }
}
