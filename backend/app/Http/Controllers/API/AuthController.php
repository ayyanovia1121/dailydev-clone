<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        // payload variable get the validated data
        $payload = $request->validate();

        try {
            $payload['password'] = Hash::make($payload['password']);
            User::create($payload);
            return response()->json([
                "message" => "Account created successfully!!",
            ],200);
        } catch (\Exception $err) {
            Log::info("Register error:".$err->getMessage());
            return response()->json([
                "message" => "Something went wrong!!. Please try again later",
            ],500);
        }
    }
}
