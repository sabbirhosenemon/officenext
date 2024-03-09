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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('lastName');
            $table->string('username');
            $table->string('password');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('street')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zipCode')->nullable();
            $table->string('country')->nullable();
            $table->dateTime('joinDate')->nullable();
            $table->dateTime('leaveDate')->nullable();
            $table->string('employeeId')->unique();
            $table->string('bloodGroup')->nullable();
            $table->string('image')->nullable();
            $table->unsignedBigInteger('departmentId')->nullable();
            $table->unsignedBigInteger('roleId');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('departmentId')->references('id')->on('department');
            $table->foreign('roleId')->references('id')->on('role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
