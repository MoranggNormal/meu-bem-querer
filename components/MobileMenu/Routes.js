import HomeIcon from '@mui/icons-material/Home';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';

import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import PaidIcon from '@mui/icons-material/Paid';
import EmailIcon from '@mui/icons-material/Email';

const firstRoutes = [
 {route: 'Início', href: '/', icon: <HomeIcon /> },
 {route: 'Fazer uma doação', href: '/addPet', icon: <AddReactionIcon /> },
 {route: 'Adotar um Pet', href: '/pets', icon: <FavoriteIcon /> },
 {route: 'Como doar', href: '/', icon: <InfoIcon /> },
]

const secondRoutes = [
 {route: 'Contribuir', href: '/', icon: <PaidIcon /> },
 {route: 'Preciso de ajuda', href: '/', icon: <HelpCenterIcon /> },
 {route: 'Fale conosco', href: '/', icon: <EmailIcon /> },
]


export {firstRoutes, secondRoutes}