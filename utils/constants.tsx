import { BsEmojiSmileFill, BsMusicNote } from 'react-icons/bs';
import { GiLips, GiFoodTruck, GiGameConsole, GiPawPrint, GiStarMedal} from 'react-icons/gi';
import  {AiFillCode} from 'react-icons/ai'

export const topics = [
  {
    name: 'coding',
    icon: <AiFillCode />,
  },
  {
    name: 'comedy',
    icon: <BsEmojiSmileFill />,
  },
  {
    name: 'gaming',
    icon: <GiGameConsole />,
  },
  {
    name: 'food',
    icon: <GiFoodTruck />,
  },
  {
    name: 'music',
    icon: <BsMusicNote/>,
  },
  {
    name: 'beauty',
    icon: <GiLips />,
  },
  {
    name: 'animals',
    icon: <GiPawPrint />,
  },
  {
    name: 'sports',
    icon: <GiStarMedal />,
  },
];

export const footerList1 = ['About', 'Newsroom', 'Store', 'Contact', 'Careers', 'Creator Directory']
export const footerList2 = [ 'Advertise','Developers','QuickVids Rewards' ]
export const footerList3 = [ 'Help', 'Safety', 'Terms', 'Privacy', 'Creator Portal', 'Community Guidelines' ]
export const aboutURL = "https://quickvids-about.vercel.app/"