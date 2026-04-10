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
    public function __construct(
        private readonly User $user,
        private readonly string $password,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if (Hash::needsRehash($this->user->password)) {
            return;
        }

        $this->user->update([
            'password' => Hash::make($this->password)
        ]);
    }
}
