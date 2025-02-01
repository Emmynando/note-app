import React from "react";
import Image from "next/image";

type SvgViewerProps = {
  svgFile: string;
  className?: string;
};

const SvgViewer: React.FC<SvgViewerProps> = ({ svgFile, className }) => {
  return (
    <span className={`inline-svg `} role="img" aria-label={"note app"}>
      <Image
        src={svgFile}
        width={0}
        height={0}
        alt="note app"
        className={className}
      />
    </span>
  );
};

export default SvgViewer;
