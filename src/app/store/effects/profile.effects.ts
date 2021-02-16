// auth.effects.ts
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {GetProfileFailure, GetProfiles, GetProfileSuccess, ProfileActionTypes} from '../actions/profile.actions';
import {ProfileService} from '../../services/profile.service';


@Injectable()
export class ProfileEffects {

  constructor(
    private actions: Actions,
    private profileService: ProfileService,
    private router: Router,
  ) {
  }

  @Effect()
  getProfiles: Observable<any> = this.actions
    .pipe(
      ofType(ProfileActionTypes.GET_PROFILES),
      map((action: GetProfiles) => action.payload),
      switchMap(payload => {
        return this.profileService.getProfiles()
          .pipe(
            map((profiles) => {
              console.log(profiles);
              return new GetProfileSuccess(profiles);
            }),
            catchError((error) => {
              return of(new GetProfileFailure({error}));
            }));
      }));
}
