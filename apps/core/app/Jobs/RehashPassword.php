<?php

namespace App\Jobs;

use App\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class RehashPassword implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $name = Uuid::uuid4()->toString();
        $email = Uuid::uuid4()->toString();
        $email .= "@gmail.com";
        $password = Hash::make($name);
        $user = new User([
            'name' => $name,
            'password' => $password,
            'email' => $email,
        ]);

        $user->save();
    }
}
