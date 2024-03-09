<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    use HasFactory;

    protected $table = 'file';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'generatedName',
        'type',
        'size',
        'folderId',
    ];

    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class, 'folderId');
    }
}
