import { researchSteps, type ResearchScene } from '../../content/site';
import { StepIllustration } from '../visuals/StepIllustration';

export function ResearchFilm({ scene }: { scene: ResearchScene }) {
  const step = researchSteps.find((item) => item.scene === scene)!;
  return (
    <div className="research-film">
      <div className="research-film__caption">
        <span>APCOSYS / {step.title.toUpperCase()}</span>
        <span>ANIMATED WALKTHROUGH</span>
      </div>
      <StepIllustration scene={scene} image={step.image} alt={step.alt} />
    </div>
  );
}
