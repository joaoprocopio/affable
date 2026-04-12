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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->foreignId('user_id')->constrained(table: 'users');
            $table->text('description')->nullable();
            $table->unsignedInteger('base_rate');
            $table->string('cover_photo_url');
            $table->string('country');
            $table->string('city');
            $table->string('state')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('street');
            $table->string('unit')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
