import { FluencyYtRmkt, FLUENCY_YT_RMKT_DEFAULTS, calcFluencyYtRmktDuration, calculateFluencyYtRmkt } from "./fluency-yt-rmkt/FluencyYtRmkt";
import "./index.css";
import { Composition } from "remotion";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition id="fluency-yt-rmkt" component={FluencyYtRmkt} durationInFrames={calcFluencyYtRmktDuration("roteiro")} fps={30} width={1080} height={1920} defaultProps={FLUENCY_YT_RMKT_DEFAULTS} calculateMetadata={calculateFluencyYtRmkt} />
		</>
	);
};
