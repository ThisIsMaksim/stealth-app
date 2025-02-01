import {Button} from "keep-react";
import {ChatText} from "phosphor-react";

export const Support = () => {
  return (
    <Button
      variant="softBg"
      shape="circle"
      className="fixed right-[32px] bottom-[32px] w-[54px] h-[54px]"
      onClick={() => window.open("https://t.me/elvyn_ai", "_blank")}
    >
      <ChatText size={24} />
    </Button>
  )
}