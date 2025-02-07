import Link from "next/link";

export default function UnresponsiveView() {
  return (
    <main
      className="w-dvw h-dvh flex items-center justify-center fixed z-50 bg-[#2f3136]
     inset-0 overflow-hidden">
      <div className="w-[80%] md-[60%] h-max-content">
        <h2 className="text-center">
          The Page Which you asked to view, cannot be seen on smaller devices.
          Kindly access this on a larger screen...
        </h2>
        <p className="text-center mt-8">
          if you are still here, would you want to view the developer&apos;s
          LinkedIn Profile,{" "}
          <Link
            href="https://www.linkedin.com/in/chukwuemeka-okezie-2b1335177"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline underline-offset-4">
            here?{" "}
          </Link>
        </p>
      </div>
    </main>
  );
}
