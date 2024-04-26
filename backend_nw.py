# Load an image
# image = cv2.imread('./zidane.jpg')
# Display the image in a window named 'image'
# cv2.imshow('image', image)
# # Wait for a key press and then close the window
# # cv2.waitKey(0)
# cv2.destroyAllWindows()


import time
from ultralytics import YOLO, engine
import websocket
import json

# def on_message(ws, message):
#     print(f"Received: {message}")

# def on_error(ws, error):
#     print(f"Error: {error}")

# def on_close(ws):
#     print("### closed ###")

# def on_open(ws):
#     print("### opened ###")

def detect_and_send_to_ws(model_path, source='screen', save_txt=True):
    # Initialize the YOLO model
    yolo = YOLO(model_path)
    
    # Perform object detection
    results = yolo.predict(source=source, verbose=False, stream=True, save_txt=save_txt, save=True)
    for result in results:
        for box in result.boxes:
            if box.cls == 0: # Assuming class 0 represents persons
                box_data = box.xywh.tolist()[0] # Assuming you want to send the first box's data
                print(box_data)
                # ws.send(json.dumps(box_data)) # Send the box data as JSON
        # time.sleep(1)

    # Close the WebSocket connection
    # ws.close()

if __name__ == "__main__":
    model_path = './yolov5s.pt' # Update this to your model path

    # Create a WebSocket connection
    # ws = websocket.WebSocketApp("ws://localhost:8080",
    #                             on_message=on_message,
    #                             on_error=on_error,
    #                             on_close=on_close)
    # ws.on_open = on_open

    # Run the detection function and send data to WebSocket
    detect_and_send_to_ws(model_path, source='screen', save_txt=True)

    # Start the WebSocket connection
    # ws.run_forever()
# The results object contains information about the detection, including paths to saved text files
# print(results)
