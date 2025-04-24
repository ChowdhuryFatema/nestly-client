

import homeImage from "@/app/assets/images/home.png";
import Image from "next/image";

const Service = () => {
    return (
        <div>
            <div>
                 <Image src={homeImage} width={30} height={40} alt="Home Image" />
            </div>
        </div>
    );
};

export default Service;