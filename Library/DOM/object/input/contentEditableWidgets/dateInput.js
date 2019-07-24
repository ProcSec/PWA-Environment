import DateToString from "@Core/Tools/time/dateToString"
import Design from "@Core/Services/design"
import ValueToDate from "@Core/Tools/time/ValueToDate"
import { $$ } from "@Core/Services/Language/handler"
import { Align } from "@Environment/Library/DOM/style"
import WidgetEditable from "../widgetEditable"
import TextInput from "../textInput"
import Button from "../button"
import IconSide from "../../iconSide"
import { CardContent } from "../../card"

export default class DateInput {
    constructor({
        content = DateToString(), placeholder = "", onchange = () => { }, iconName = "edit",
    } = {}) {
        let acceptHandler

        return new WidgetEditable({
            builder(input, context) {
                const c = []
                const numberInput = new TextInput({
                    set: {
                        type: "date",
                        value: input.currentValue,
                    },
                    style: {
                        boxShadow: "none",
                        fontSize: "42px",
                        color: Design.getVar("color-accent"),
                        overflowX: "auto",
                        textAlign: "center",
                        padding: "0 10px",
                        width: "400px",
                        margin: "10px auto 0 auto",
                    },
                    params: {
                        onRendered(ev, el) {
                            setTimeout(() => {
                                el.elementParse.native.focus()
                            }, 200)
                        },
                    },
                })
                c.push(numberInput)

                acceptHandler = () => {
                    const newValue = numberInput.elementParse.native.value
                    if (!newValue.match(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/)) return
                    let dat = ValueToDate(newValue)
                    dat = DateToString(new Date(dat[2], dat[1], dat[0]))

                    input.emitEvent("editValue", { content: dat })
                    if (typeof onchange === "function") onchange(dat)
                    context().emitEvent("contextMenuClose")
                }

                c.push(new Button({
                    // TODO: Localize
                    content: new IconSide("done", $$("done")),
                    type: ["accent"],
                    style: {
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: "2em",
                    },
                    handler: acceptHandler,
                }))

                return new CardContent(new Align(c, ["center", "column"]), { whiteSpace: "nowrap" })
            },
            disableResizeHide: true,
            defaults: `${content}`,
            placeholder,
            iconName,
            style: {
                boxShadow: "none",
            },
            contentStyle: {
                minHeight: "auto",
                paddingBottom: "0",
            },
        })
    }
}