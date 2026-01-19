import { getAllBanner } from "../api/banner";
import { useQuery } from "@tanstack/react-query";
export default function Banner() {
  const {
    error: getAllBannerError,
    data: getAllBannerData,
    isLoading: getAllBannerLoading,
  } = useQuery({
    queryKey: ["banner"],
    queryFn: () => getAllBanner(),
  });
  console.log("Data:", getAllBannerData);

  if (getAllBannerLoading) {
    return <div>Loading...</div>;
  }
  return <div>Banner</div>;
}
