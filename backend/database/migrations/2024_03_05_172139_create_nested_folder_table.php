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
        Schema::create('nestedFolder', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parentFolderId')->nullable();
            $table->unsignedBigInteger('childFolderId')->nullable();
            $table->timestamps();

            $table->foreign('parentFolderId')->references('id')->on('folder');
            $table->foreign('childFolderId')->references('id')->on('folder');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nestedFolder');
    }
};
