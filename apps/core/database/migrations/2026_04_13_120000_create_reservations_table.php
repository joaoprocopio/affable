<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained(table: 'properties')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained(table: 'users')->cascadeOnDelete();
            $table->string('provider');
            $table->string('status');
            $table->string('external_id')->nullable();
            $table->string('channel_reservation_id')->nullable();
            $table->date('check_in')->nullable();
            $table->date('check_out')->nullable();
            $table->unsignedInteger('nights')->nullable();
            $table->unsignedInteger('guests')->nullable();
            $table->unsignedInteger('total')->nullable();
            $table->string('currency', 3)->nullable();
            $table->timestamp('booked_at')->nullable();
            $table->timestamp('acknowledged_at')->nullable();
            $table->string('guest_name')->nullable();
            $table->string('guest_email')->nullable();
            $table->string('email_status')->nullable();
            $table->timestamp('email_sent_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'created_at']);
            $table->index(['provider', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
