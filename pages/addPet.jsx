import { useAuth } from "../hooks/useAuth";
import CantPass from "../components/CantContinue/CantContinue";
import AnnouncePet from "../components/AnnouncePet/AnnouncePet";

const AddPet = () => {
  const auth = useAuth();

  return <>{auth.user ? <AnnouncePet /> : <CantPass />}</>;
};

export default AddPet;
