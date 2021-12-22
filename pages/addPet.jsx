
import { useAuth } from "../hooks/useAuth";
import CantPass from "../components/CantContinue/CantContinue";
import AnnouncePet from "../components/Add";

const AddPet = () => {
  const auth = useAuth();

  return <>{auth.user ? <AnnouncePet /> : <CantPass />}</>;
};

export default AddPet;
