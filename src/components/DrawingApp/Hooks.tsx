import { useEffect, useRef } from "react";

export function useOnDraw(onDraw:any) {

    const canvasRef = useRef<any>(null);
    const isDrawingRef = useRef<any>(false);
    const prevPointRef = useRef<any>(null);


    const mouseMoveListenerRef = useRef<any>(null);
    const mouseUpListenerRef = useRef<any>(null);


    function setCanvasRef(ref:any) {
        canvasRef.current = ref;
    }

    function onCanvasMouseDown() {
        isDrawingRef.current = true;
    }

    useEffect(() => {
        function computePointInCanvas(clientX:any, clientY:any) {
            if (canvasRef.current) {
                const boundingRect = canvasRef.current.getBoundingClientRect();
                return {
                    x: clientX - boundingRect.left,
                    y: clientY - boundingRect.top
                }
            } else {
                return null;
            }

        }
        function initMouseMoveListener() {
            const mouseMoveListener = (e:any) => {
                if (isDrawingRef.current && canvasRef.current) {
                    const point = computePointInCanvas(e.clientX, e.clientY);
                    const ctx = canvasRef.current.getContext('2d');
                    if (onDraw) onDraw(ctx, point, prevPointRef.current);
                    
                    prevPointRef.current = point;
 
                }
            }
            mouseMoveListenerRef.current = mouseMoveListener;
            window.addEventListener("mousemove", mouseMoveListener);
        }

        function initMouseUpListener() {
            const listener = () => {
                isDrawingRef.current = false;
                prevPointRef.current = null;
            }
            mouseUpListenerRef.current = listener;
            window.addEventListener("mouseup", listener);
        }

        function cleanup() {
            if (mouseMoveListenerRef.current) {
                window.removeEventListener("mousemove", mouseMoveListenerRef.current);
            }
            if (mouseUpListenerRef.current) {
                window.removeEventListener("mouseup", mouseUpListenerRef.current);
            }
        }

        initMouseMoveListener();
        initMouseUpListener();
        return () => cleanup();

    }, [onDraw]);



    return {
        setCanvasRef,
        onCanvasMouseDown,
        canvasRef
    }

};