<?php

use Illuminate\Support\Facades\Route;

// Explicitly serve WebAssembly files with application/wasm MIME type
Route::get('/{wasmFile}.wasm', function ($wasmFile) {
    $filePath = public_path("{$wasmFile}.wasm");
    if (file_exists($filePath)) {
        return response()->file($filePath, [
            'Content-Type' => 'application/wasm',
            'Cache-Control' => 'public, max-age=31536000',
        ]);
    }
    abort(404);
});

// Single Page Application catch-all route for frontend navigation
Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '^(?!api|.*\.wasm$).*$');
