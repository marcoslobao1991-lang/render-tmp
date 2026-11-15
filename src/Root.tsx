import { FluencyRemake, FLUENCY_REMAKE_DEFAULTS, FLUENCY_REMAKE_FRAMES, calculateFluencyRemake } from "./fluency-remake/FluencyRemake";
import "./index.css";
import { Composition } from "remotion";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition id="fluency-remake" component={FluencyRemake} durationInFrames={FLUENCY_REMAKE_FRAMES} fps={30} width={1080} height={1920} defaultProps={FLUENCY_REMAKE_DEFAULTS} calculateMetadata={calculateFluencyRemake} />
		</>
	);
};
