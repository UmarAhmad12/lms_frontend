
import { PacmanLoader } from 'react-spinners';

const override = {
    display: "flex",
    margin: "0 auto",
    marginTop:"100px"
  };

function Loader({  loading, setloading }) {
    // const [loading, setLoading] = useState(false);

  return (
    <PacmanLoader
      cssOverride={override}
      loading={loading}
      setloading={setloading}
      size={30}
      color="#F37A24"
    />
  )
}

export default Loader