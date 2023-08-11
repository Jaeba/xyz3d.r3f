import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { SceneXyz3D } from './SceneXyz3D.jsx';
import { HtmlOverlay } from './HtmlOverlay.jsx';
import { ProgressLoader } from './ProgressLoader.jsx';
import { Environment, Sky } from '@react-three/drei';
import { NavBar } from './NavBar.jsx';


export function Xyz3D()
{
    const [ showPopup, setShowPopup ] = useState(false);
    const [ popupContent, setPopupContent ] = useState(null);
    const [ isInitialized, setIsInitialized ] = useState(false);
    const [ isDebugging, setIsDebugging ] = useState(false);

    // if the user presses the "D" key, toggle debugging mode
    React.useEffect(() =>
    {
        const handleKeyDown = (event) =>
        {
            if (event.key === "d")
            {
                setIsDebugging(!isDebugging);
                console.log("Debugging mode: ", !isDebugging)
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [ isDebugging ]);


    const xyzRef = React.useRef(null);

    return (
        <>

            {/* Wrapper div to cover the screen */}
            <div className="absolute inset-0 bg-black">

                {/* 3D rendering canvas */}
                <Canvas>

                    {/* Loading screen */}
                    <Suspense fallback={<ProgressLoader />}>

                        {/* 3D Scene */}
                        <SceneXyz3D
                            ref={xyzRef}
                            path={"assets/scene.glb"}
                            setShowPopup={setShowPopup}
                            setPopupContent={setPopupContent}
                            setIsInitialized={setIsInitialized}
                            isDebugging={isDebugging}
                        />

                        {/* Skybox */}
                        <Environment files={"assets/4k.hdr"} frames={1} resolution={512} background />

                    </Suspense>
                </Canvas>

            </div>

            {/* Navbar */}
            {isInitialized && <NavBar xyzRef={xyzRef.current} />}

            {/* HTML popup container */}
            {showPopup && <HtmlOverlay content={popupContent} setShowPopup={setShowPopup} />}

        </>
    );
}
