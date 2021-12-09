import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { NavController } from '@ionic/angular';
import { NetworkProviderService } from 'src/app/utility/network-provider.service';

@Component({
  selector: 'app-master-settings',
  templateUrl: './master-settings.page.html',
  styleUrls: ['./master-settings.page.scss'],
  providers: [NetworkProviderService, Network]
})
export class MasterSettingsPage implements OnInit {
  public isBanking = true;
  public isPayGateway = false;
  constructor(public navController: NavController) { }

  ngOnInit() { }

  OnBanking() {
    this.isPayGateway = false;
    this.isBanking = true;
  }
  OnPayGateway() {
    this.isPayGateway = true;
    this.isBanking = false;
  }
}
