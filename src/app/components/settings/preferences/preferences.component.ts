import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../services/settings.service';
import {Settings} from '../../../models/Settings';
import {FormBuilder} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  settings: Settings;
  settingsForm;

  constructor(
    private settingsService: SettingsService,
    private formBuilder: FormBuilder,
    private notificationsService: NotificationsService
  ) {
  }

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group({
      isEmailNotificationEnabled: false,
      isMessageEmailNotificationEnabled: false,
      canBeAddedToProject: false,
      canBeAddedToTeam: false
    });
    this.settingsService.getSettings().subscribe(settings => {
      this.setSettings(settings);
    });
  }

  onSubmit(patchedSettings) {
    console.log(patchedSettings);
    this.settingsService.patchSettings(patchedSettings).subscribe(settings => {
      this.setSettings(settings);
      this.notificationsService.success('Success', 'Preferences updated!');
    });
  }

  private setSettings(settings: Settings) {
    this.settingsForm = this.formBuilder.group({
      isEmailNotificationEnabled: settings.isEmailNotificationEnabled,
      isMessageEmailNotificationEnabled: settings.isMessageEmailNotificationEnabled,
      canBeAddedToProject: settings.canBeAddedToProject,
      canBeAddedToTeam: settings.canBeAddedToTeam
    });
  }
}
