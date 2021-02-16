// auth.effects.ts
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {
  GetProfileAdditionalData,
  GetProfileFailure,
  GetProfiles,
  GetProfileSuccess,
  ProfileActionTypes
} from '../actions/profile.actions';
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
      map((action: GetProfiles) => action),
      switchMap(payload => {
        return this.profileService.getProfiles()
          .pipe(
            map((profiles) => {
              profiles.forEach(profile => {
                this.profileService.getProfileAdditionalData(profiles[0].followers_url, profiles[0].following_url)
                  .subscribe(data => {
                    profile.following_count = data.followingCount;
                    profile.followers_count = data.followersCount;
                  });
              });
              return new GetProfileSuccess(profiles);
            }),
            catchError((error) => {
              return of(new GetProfileFailure({error}));
            })
          );
      })
    );

  @Effect()
  getProfileAdditionalData: Observable<any> = this.actions
    .pipe(
      ofType(ProfileActionTypes.GET_PROFILE_ADDITIONAL_DATA),
      map((action: GetProfileAdditionalData) => action),
      switchMap(payload => {
        return this.profileService.getProfileAdditionalData(payload[0].following_url, payload[0].followers_url)
          .pipe(
            map((profiles) => {
              return new GetProfileSuccess(profiles);
            }),
            catchError((error) => {
              return of(new GetProfileFailure({error}));
            })
          );
      })
    );

  @Effect({dispatch: false})
  getProfilesSuccess: Observable<any> = this.actions.pipe(
    ofType(ProfileActionTypes.GET_PROFILES_SUCCESS),
    tap((profiles) => {

      console.log(profiles);
    })
  );

  @Effect({dispatch: false})
  getProfilesFailure: Observable<any> = this.actions.pipe(
    ofType(ProfileActionTypes.GET_PROFILES_FAILURE)
  );
}
