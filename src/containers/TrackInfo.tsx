import { useParams } from "react-router-dom";

export const TrackInfo = () => {
  const { resourceId } = useParams();

  return <div>info for {resourceId}</div>;
};
