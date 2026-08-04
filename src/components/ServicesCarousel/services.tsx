import { services } from "@/data/services";
import { IconArrowBigRight, IconArrowLeft, IconArrowRight, IconChevronsDownLeft } from "@tabler/icons-react";
import { useState } from "react"
import type { Service } from "@/data/services";

// |
export default function ServicesJ() {
  const [count, setCount] = useState<number>(1);
  const handleNext = () => {
    setCount(count + 1);
    if (services.length + 1 > count) setCount(1);

  }
  const handlePrevius = () => {
    setCount(count - 1);
    if (count < 1) setCount(services.length + 1)
  }

  return (
    <div>
      <div className="container-service">
        <div className="carrusel">
          <button onClick={handlePrevius}>
            <IconArrowLeft />
          </button>
          {services.filter((service) => service.id == count).map((servi) => (
            <div className="service-card">
              <h2>{servi.title}</h2>
              <p>{servi.description}</p>
            </div>
          ))}
          <button onClick={handleNext}><IconArrowRight /> </button>

        </div>
      </div>
    </div>
  )
}

