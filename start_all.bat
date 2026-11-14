@echo off
echo ========================================================
echo   CLOSETÉ - Launching All 5 Academic Programs
echo ========================================================

echo Starting Program 1 (Port 5000)...
start "Program 1 - Vanilla JS" cmd /k "node Program_1_Vanilla_JS/server.js"

echo Starting Program 2 (Port 3000)...
start "Program 2 - React" cmd /k "cd Program_2_React && npm run dev"

echo Starting Program 3 (Port 5001)...
start "Program 3 - Node HTTP" cmd /k "node Program_3_Node_HTTP/server.js"

echo Starting Program 4 (Port 5002)...
start "Program 4 - Express API" cmd /k "node Program_4_Express_API/server.js"

echo Starting Program 5 Backend (Port 5005)...
start "Program 5 - MERN Backend" cmd /k "node Program_5_FullStack/backend/server.js"

echo Starting Program 5 Frontend (Port 5173)...
start "Program 5 - React Frontend" cmd /k "cd Program_5_FullStack/frontend && npm run dev"

echo.
echo All 5 programs launched in separate terminal windows!
echo.
echo Program 1 UI:         http://localhost:5000
echo Program 2 UI:         http://localhost:3000
echo Program 3 API:        http://localhost:5001
echo Program 4 API:        http://localhost:5002
echo Program 5 Backend:    http://localhost:5005
echo Program 5 Frontend:   http://localhost:5173
echo.
pause
