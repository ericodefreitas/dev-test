import Logo from "@/assets/logo.svg"
import Loader from "@/components/Loader";

export default function SplashScreenLayout() {
    return (
        <div id="splash-screen">
            <img src={Logo} alt="Logo" height={70} />
            <Loader />
        </div>
    )
}