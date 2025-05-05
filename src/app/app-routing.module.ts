import { Routes, RouterModule } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';

const routes: Routes = [
    {
        path: "login",
        loadChildren: () => import("src/app/login/login.module").then(m => m.LoginModule),
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: "registration",
        loadChildren: () => import("src/app/registration/registration.module").then(m => m.RegistrationModule),
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: 'courses',
        loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule),
        canLoad: [AuthorizedGuard]
    },
    {
        path: '',
        redirectTo: '/courses',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/courses'
    },
];

export const routing = RouterModule.forRoot(routes);