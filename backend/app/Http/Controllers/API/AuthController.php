<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // payload variable get the validated data
        $payload = $request->validate([
            'name' => 'required|min:2|max:50',
            'email' => 'required|email|unique:users,email',
            'username' =>
                'required|alpha_num:ascii|min:4|max:50|unique:users,username',
            'password' => 'required|min:6|max:50|confirmed',
        ]);

        try {
            $payload['password'] = Hash::make($payload['password']);
            User::create($payload);
            return response()->json(
                [
                    'message' => 'Account created successfully!!',
                ],
                200
            );
        } catch (\Exception $err) {
            Log::info('Register error:' . $err->getMessage());
            return response()->json(
                [
                    'message' =>
                        'Something went wrong!!. Please try again later',
                ],
                500
            );
        }
    }

    public function login(Request $request)
    {
        $payload = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            $user = User::where('email', $payload['email'])->first();
            if ($user) {
                if (!Hash::check($payload['password'], $user->password)) {
                    return response()->json([
                        'status' => 401,
                        'message' => 'Invalid credentials',
                    ]);
                }

                $token = $user->createToken('web')->plainTextToken;
                $authResponse = array_merge($user->toArray(), [
                    'token' => $token,
                ]);
                return response()->json([
                    'message' => 'Logged in successfully!!',
                    'user' => $authResponse,
                ]);
            }
            return response()->json([
                        'message' => 'Invalid credentials',
                    ],401);
        } catch (\Exception $err) {
            Log::info('Login error:' . $err->getMessage());
            return response()->json(
                [
                    'message' =>
                        'Something went wrong!!. Please try again later',
                ],
                500
            );
        }
    }

    public function checkCredentials(Request $request)
    {
        $payload = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            $user = User::where('email', $payload['email'])->first();
            if ($user) {
                if (!Hash::check($payload['password'], $user->password)) {
                    return response()->json(
                        [
                            'message' => 'Invalid credentials',
                        ],
                        401
                    );
                }

                return response()->json([
                    'status' => 200,
                    'message' => 'Logged in successfully!!',
                ]);
            }
            return response()->json(
                [
                    'message' => 'Invalid credentials',
                ],
                401
            );
        } catch (\Exception $err) {
            Log::info('Login Credentials error:' . $err->getMessage());
            return response()->json(
                [
                    'message' =>
                        'Something went wrong!! Backend. Please try again later',
                ],
                500
            );
        }
    }
}
