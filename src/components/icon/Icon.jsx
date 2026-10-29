import Image from "next/image";
import minusIcon from "@/assets/images/minus.svg";
import plusIcon from "@/assets/images/plus.svg";
import alarmActiveIcon from "@/assets/images/alarm_active.svg";
import alarmDefaultIcon from "@/assets/images/alarm-default.svg";
import alertIcon from "@/assets/images/alert.svg";
import backIcon from "@/assets/images/back.svg";
import closeIcon from "@/assets/images/close.svg";
import downIcon from "@/assets/images/down.svg";
import exchangeIcon from "@/assets/images/exchange.svg";
import filterIcon from "@/assets/images/filter.svg";
import goIcon from "@/assets/images/go.svg";
import invisibleIcon from "@/assets/images/invisible.svg";
import leftIcon from "@/assets/images/left.svg";
import menuIcon from "@/assets/images/menu.svg";
import profileIcon from "@/assets/images/profile.svg";
import rightIcon from "@/assets/images/right.svg";
import searchIcon from "@/assets/images/search.svg";
import upIcon from "@/assets/images/up.svg";
import visibleIcon from "@/assets/images/visible.svg";

const iconSources = {
  minus: minusIcon,
  plus: plusIcon,
  alarmActive: alarmActiveIcon,
  alarmDefault: alarmDefaultIcon,
  alert: alertIcon,
  back: backIcon,
  close: closeIcon,
  down: downIcon,
  exchange: exchangeIcon,
  filter: filterIcon,
  go: goIcon,
  invisible: invisibleIcon,
  left: leftIcon,
  menu: menuIcon,
  profile: profileIcon,
  right: rightIcon,
  search: searchIcon,
  up: upIcon,
  visible: visibleIcon,
};

export default function Icon({ name, size = 24 }) {
  const src = iconSources[name];

  if (!src) return null;

  return <Image src={src} alt="" width={size} height={size} />;
}
