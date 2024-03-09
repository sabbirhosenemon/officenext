<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('user', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            Route::middleware('user')
                ->prefix('user')
                ->group(base_path('routes/userRoutes.php'));
            Route::middleware('permission')
                ->prefix('permission')
                ->group(base_path('routes/permissionRoutes.php'));
            Route::middleware('role')
                ->prefix('role')
                ->group(base_path('routes/roleRoutes.php'));
            Route::middleware('setting')
                ->prefix('setting')
                ->group(base_path('routes/appSettingRoutes.php'));
            Route::middleware('role-permission')
                ->prefix('role-permission')
                ->group(base_path('routes/rolePermissionRoutes.php'));
            Route::middleware('department')
                ->prefix('department')
                ->group(base_path('routes/departmentRoutes.php'));
            Route::middleware('designation')
                ->prefix('designation')
                ->group(base_path('routes/designationRoutes.php'));
            Route::middleware('designationHistory')
                ->prefix('designationHistory')
                ->group(base_path('routes/designationHistoryRoutes.php'));
            Route::middleware('dashboard')
                ->prefix('dashboard')
                ->group(base_path('routes/dashboardRoutes.php'));
            Route::middleware('task-priority')
                ->prefix('task-priority')
                ->group(base_path('routes/priorityRoutes.php'));
            Route::middleware('project')
                ->prefix('project')
                ->group(base_path('routes/projectRoutes.php'));
            Route::middleware('milestone')
                ->prefix('milestone')
                ->group(base_path('routes/milestoneRoutes.php'));
            Route::middleware('tasks')
                ->prefix('tasks')
                ->group(base_path('routes/taskRoutes.php'));
            Route::middleware('task-status')
                ->prefix('task-status')
                ->group(base_path('routes/taskStatusRoutes.php'));
            Route::middleware('project-team')
                ->prefix('project-team')
                ->group(base_path('routes/projectTeamRoutes.php'));
            Route::middleware('sendMessage')
                ->prefix('sendMessage')
                ->group(base_path('routes/messageRoutes.php'));
            Route::middleware('folder')
                ->prefix('folder')
                ->group(base_path('routes/folderRoutes.php'));
            Route::middleware('files')
                ->prefix('files')
                ->group(base_path('routes/filesRoutes.php'));
            Route::middleware('file')
                ->prefix('file')
                ->group(base_path('routes/fileRoutes.php'));
        });
    }
}
