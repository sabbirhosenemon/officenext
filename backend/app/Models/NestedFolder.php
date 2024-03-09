<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NestedFolder extends Model
{
    use HasFactory;

    protected $table = 'nestedFolder';
    protected $primaryKey = 'id';
    protected $fillable = [
        'parentFolderId',
        'childFolderId',
    ];

    public function folderOfParent(): BelongsTo
    {
        return $this->belongsTo(Folder::class, 'parentFolderId');
    }

    public function folderOfChild(): BelongsTo
    {
        return $this->belongsTo(Folder::class, 'childFolderId');
    }
}
