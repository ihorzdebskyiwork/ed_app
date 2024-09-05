import courses from "../../assets/courseList.json";
import { Course } from "./Course";

import appDeveloper from "../../assets/application_developer.png";
import kubernetesAdmin from "../../assets/kubernetes_admin.png";
import redHat from "../../assets/redhat.png";
import securitySpecialist from "../../assets/security_specialist.png";

export const CourseList = () => {
  const images = [appDeveloper, kubernetesAdmin, securitySpecialist, redHat];

  return (
    <div className="w-full p-4 pb-10 grid grid-rows-2 grid-flow-col px-40 gap-10 place-content-center">
      {courses &&
        courses.map((el: any, index: number) => (
          <Course
            key={el.id}
            id={el.id}
            description={el.description}
            duration={el.durationMin}
            isReady={el.isReady}
            questions={el.questions}
            tittle={el.tittle}
            isFree={el.isFree}
            sets={el.sets}
            image={images[index]}
          />
        ))}
    </div>
  );
};
