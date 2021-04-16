import { Circle, CirclesContainer, RingLoaderContainer } from "./style";

const RingLoader = () => {
  return (
    <RingLoaderContainer>
      <CirclesContainer>
        {[...Array(4)].map((_, index) => (
          <Circle key={index} />
        ))}
      </CirclesContainer>
    </RingLoaderContainer>
  );
};

export default RingLoader;
