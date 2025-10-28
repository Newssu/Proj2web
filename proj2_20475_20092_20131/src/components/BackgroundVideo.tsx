const BackgroundVideo: React.FC = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
        <video
          className="absolute top-1/2 left-1/2 w-[177.78vh] h-[100vh] min-w-[100vw] min-h-[56.25vw] transform -translate-x-1/2 -translate-y-1/2 object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          {/* Ensure 'wgiteBGball.mp4' is in your /public/File/ directory */}
          <source src="/File/wgiteBGball.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/*1123*/}
      </div>
      
);
export default BackgroundVideo;
