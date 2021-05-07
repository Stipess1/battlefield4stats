import { DataSource } from '@angular/cdk/collections';
import { leadingComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../model/profile';
import { Weapon } from '../model/weapon';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private json: any;
  public profile: Profile = new Profile();
  public weapons: Weapon[] = [];
  public weaponsSlice: Weapon[] = [];
  public loaded: boolean = false;
  public showAllToggle: boolean = false;
  public l_xlarge = {
    "ch-assault-oceanicgreen": "5e1e7e70",
    "ch-assault-urbanairborne": "7618b837",
    "ch-engineer-oceanicgreen": "1896f877",
    "ch-engineer-urbanairborne": "56886ffd",
    "ch-engineer": "31b3446f",
    "ch-recon-oceanicgreen": "d63dfe08",
    "ch-recon-urbanairborne": "ca986bef",
    "ch-recon": "1a7d01af",
    "ch-support-oceanicgreen": "67866476",
    "ch-support-urbanairborne": "b93029ab",
    "ch-support": "69d11d4b",
    "default": "a105f57e",
    "ru-assault-berezka": "fb296cef",
    "ru-assault-partizan": "4cffb644",
    "ru-assault": "09fc0114",
    "ru-engineer-berezka": "ba7ea9ff",
    "ru-engineer-partizan": "4b832c43",
    "ru-engineer": "bd850b17",
    "ru-recon-berezka": "9cc6faed",
    "ru-recon-partizan": "b2557765",
    "ru-recon": "1717a10c",
    "ru-support-berezka": "128d8a51",
    "ru-support-partizan": "a511d19e",
    "ru-support": "0341dad3",
    "soldier2": "76a56031",
    "sp-dima": "5b162f8e",
    "sp-hanna": "aff50215",
    "sp-irish": "7a4fa504",
    "sp-pac": "c2b23e14",
    "us-assault-chocchip": "d8aa79ba",
    "us-assault-ucp": "1e372ff6",
    "us-assault": "b87a4e87",
    "us-engineer-chocchip": "c218270f",
    "us-engineer-ucp": "b3d1c056",
    "us-engineer": "cbf85f1e",
    "us-recon-chocchip": "73057555",
    "us-recon-ucp": "1e5a2c5a",
    "us-recon": "3e2da452",
    "us-support-chocchip": "5e8fffd8",
    "us-support-ucp": "06985670",
    "us-support": "782f8f1d",
    "ru_jet": "7a587d9f",
    "us_heli": "8b05904e",
    "us_land": "43834d09",
    "ch_water": "4322321d",
    "Premium_CH_Heli_01": "df422380",
    "Premium_RU_Jeep_01": "b76cc997",
    "Premium_US_Truck_01": "46cfaa54",
    "Premium_RU_Jet_01": "3d1164e5",
    "CH_Land_02": "d57918b6",
    "RU_Tank_01": "97bdc70e",
    "US_Jet_01": "1432153d",
    "US_Tank_02": "573e6e9e",
    "Premium_CH_Heli_02": "3df996fd",
    "Premium_RU_Heli_02": "6de80bac",
    "Premium_RU_Tank_01": "97402202",
    "Premium_US_Truck_02": "517e26fc",
    "Premium_CH_Jet_01": "cd801858",
    "Premium_RU_Heli_01": "b875c616",
    "Premium_RU_Tank_02": "86376946",
    "Premium_US_Jet_01": "3fc3f89a",
    "Premium_CH_Jet_02": "d0b101ec",
    "Premium_CH_Land_01": "c8cedd8a",
    "Premium_US_Truck_03": "2407e8d4",
    "Premium_US_Water_02": "c7272f86"
  };

  public ranks = {
    "RANK00": "RECRUIT",
    "RANK01": "Private First Class",
    "RANK02": "Private First Class II",
    "RANK03": "Private First Class III",
    "RANK04": "Private First Class IV",
    "RANK05": "Private First Class V",
    "RANK06": "Lance Corporal",
    "RANK07": "Lance Corporal II",
    "RANK08": "Lance Corporal III",
    "RANK09": "Lance Corporal IV",
    "RANK10": "Lance Corporal V",
    "RANK11": "Corporal",
    "RANK12": "Corporal II",
    "RANK13": "Corporal III",
    "RANK14": "Corporal IV",
    "RANK15": "Corporal V",
    "RANK16": "Sergeant",
    "RANK17": "Sergeant II",
    "RANK18": "Sergeant III",
    "RANK19": "Sergeant IV",
    "RANK20": "Sergeant V",
    "RANK21": "Staff Sergeant",
    "RANK22": "Staff Sergeant II",
    "RANK23": "Staff Sergeant III",
    "RANK24": "Staff Sergeant IV",
    "RANK25": "Staff Sergeant V",
    "RANK26": "Gunnery Sergeant",
    "RANK27": "Gunnery Sergeant II",
    "RANK28": "Gunnery Sergeant III",
    "RANK29": "Gunnery Sergeant IV",
    "RANK30": "Gunnery Sergeant V",
    "RANK31": "Master Sergeant",
    "RANK32": "Master Sergeant II",
    "RANK33": "Master Sergeant III",
    "RANK34": "Master Sergeant IV",
    "RANK35": "Master Sergeant V",
    "RANK36": "First Sergeant",
    "RANK37": "First Sergeant II",
    "RANK38": "First Sergeant III",
    "RANK39": "First Sergeant IV",
    "RANK40": "First Sergeant V",
    "RANK41": "Master Gunnery Sergeant",
    "RANK42": "Master Gunnery Sergeant II",
    "RANK43": "Master Gunnery Sergeant III",
    "RANK44": "Master Gunnery Sergeant IV",
    "RANK45": "Master Gunnery Sergeant V",
    "RANK46": "Sergeant Major",
    "RANK47": "Sergeant Major II",
    "RANK48": "Sergeant Major III",
    "RANK49": "Sergeant Major IV",
    "RANK50": "Sergeant Major V",
    "RANK51": "Warrant Officer One",
    "RANK52": "Warrant Officer One II",
    "RANK53": "Warrant Officer One III",
    "RANK54": "Warrant Officer One IV",
    "RANK55": "Warrant Officer One V",
    "RANK56": "Chief Warrant Officer Two",
    "RANK57": "Chief Warrant Officer Two II",
    "RANK58": "Chief Warrant Officer Two III",
    "RANK59": "Chief Warrant Officer Two IV",
    "RANK60": "Chief Warrant Officer Two V",
    "RANK61": "Chief Warrant Officer Three",
    "RANK62": "Chief Warrant Officer Three II",
    "RANK63": "Chief Warrant Officer Three III",
    "RANK64": "Chief Warrant Officer Three IV",
    "RANK65": "Chief Warrant Officer Three V",
    "RANK66": "Chief Warrant Officer Four",
    "RANK67": "Chief Warrant Officer Four II",
    "RANK68": "Chief Warrant Officer Four III",
    "RANK69": "Chief Warrant Officer Four IV",
    "RANK70": "Chief Warrant Officer Four V",
    "RANK71": "Chief Warrant Officer Five",
    "RANK72": "Chief Warrant Officer Five II",
    "RANK73": "Chief Warrant Officer Five III",
    "RANK74": "Chief Warrant Officer Five IV",
    "RANK75": "Chief Warrant Officer Five V",
    "RANK76": "Second Lieutenant",
    "RANK77": "Second Lieutenant II",
    "RANK78": "Second Lieutenant III",
    "RANK79": "Second Lieutenant IV",
    "RANK80": "Second Lieutenant V",
    "RANK81": "First Lieutenant",
    "RANK82": "First Lieutenant II",
    "RANK83": "First Lieutenant III",
    "RANK84": "First Lieutenant IV",
    "RANK85": "First Lieutenant V",
    "RANK86": "Captain",
    "RANK87": "Captain II",
    "RANK88": "Captain III",
    "RANK89": "Captain IV",
    "RANK90": "Captain V",
    "RANK91": "Major",
    "RANK92": "Major II",
    "RANK93": "Major III",
    "RANK94": "Major IV",
    "RANK95": "Major V",
    "RANK96": "Lieutenant Colonel",
    "RANK97": "Lieutenant Colonel II",
    "RANK98": "Lieutenant Colonel III",
    "RANK99": "Lieutenant Colonel IV",
    "RANK100": "Colonel",
    "RANK101": "Colonel II",
    "RANK102": "Colonel III",
    "RANK103": "Colonel IV",
    "RANK104": "Colonel V",
    "RANK105": "Colonel VI",
    "RANK106": "Colonel VII",
    "RANK107": "Colonel VIII",
    "RANK108": "Colonel IX",
    "RANK109": "Colonel X",
    "RANK110": "Brigadier General",
    "RANK111": "Brigadier General II",
    "RANK112": "Brigadier General III",
    "RANK113": "Brigadier General IV",
    "RANK114": "Brigadier General V",
    "RANK115": "Brigadier General VI",
    "RANK116": "Brigadier General VII",
    "RANK117": "Brigadier General VIII",
    "RANK118": "Brigadier General IX",
    "RANK119": "Brigadier General X",
    "RANK120": "Major General",
    "RANK121": "Major General II",
    "RANK122": "Major General III",
    "RANK123": "Major General IV",
    "RANK124": "Major General V",
    "RANK125": "Major General VI",
    "RANK126": "Major General VII",
    "RANK127": "Major General VIII",
    "RANK128": "Major General IX",
    "RANK129": "Major General X",
    "RANK130": "Lieutenant General",
    "RANK131": "Lieutenant General II",
    "RANK132": "Lieutenant General III",
    "RANK133": "Lieutenant General IV",
    "RANK134": "Lieutenant General V",
    "RANK135": "Lieutenant General VI",
    "RANK136": "Lieutenant General VII",
    "RANK137": "Lieutenant General VIII",
    "RANK138": "Lieutenant General IX",
    "RANK139": "Lieutenant General X",
    "RANK140": "General",

  }

  constructor(public http: HttpService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {   
    let id = this.route.snapshot.paramMap.get("id");
    let profile = new Profile();
    let nickname = this.route.snapshot.paramMap.get("nickname")
    profile.nickname = nickname;
    this.http.getDetailedStats(id).subscribe((data: any) => {
        let kills = data['data']['generalStats']['kills'];
        let kdRatio = data['data']['generalStats']['kdRatio'];
        let accuracy = data['data']['generalStats']['accuracy'];
        let deahts = data['data']['generalStats']['deaths'];
        let timePlayed = data['data']['generalStats']['timePlayed'];

        let skill = data['data']['generalStats']['skill'];
        let quitPercentage = data['data']['generalStats']['quitPercentage'];
        let revives = data['data']['generalStats']['revives'];
        let teamdeathMatch = data['data']['generalStats']['teamdeathmatch'];
        let conquest = data['data']['generalStats']['conquestlarge'];
        let scoreBonus = data['data']['generalStats']['sc_bonus'];
        let resupplies = data['data']['generalStats']['resupplies'];
        let repairs = data['data']['generalStats']['repairs'];
        let shotsFired = data['data']['generalStats']['shotsFired'];
        let rankScore = data['data']['generalStats']['rankScore'];
        let score = data['data']['generalStats']['score'];
        let rank = data['data']['generalStats']['rank'];
        let suppressionAssists = data['data']['generalStats']['suppressionAssists'];
        let killsPerMinute = data['data']['generalStats']['killsPerMinute'];
        let chainLink = data['data']['generalStats']['chainlink'];
        let roundsPlayed = data['data']['generalStats']['numRounds'];
        let killStreakBonus = data['data']['generalStats']['killStreakBonus'];
        let shotsHit = data['data']['generalStats']['shotsHit'];
        let roundsLost = data['data']['generalStats']['numLosses'];
        let engineer = data['data']['generalStats']['engineer'];
        let commander = data['data']['generalStats']['commander'];
        let dogtagsTaken = data['data']['generalStats']['dogtagsTaken'];
        let scoreVehicle = data['data']['generalStats']['sc_vehicle'];
        let scoreTeam = data['data']['generalStats']['sc_team'];
        let heals = data['data']['generalStats']['heals'];
        let obliteration = data['data']['generalStats']['obliteration'];
        let longestHeadshot = data['data']['generalStats']['longestHeadshot'];
        let support = data['data']['generalStats']['support'];
        let mcomDefendKills = data['data']['generalStats']['mcomDefendKills'];
        let flagDefends = data['data']['generalStats']['flagDefend'];
        let domination = data['data']['generalStats']['domination'];
        let saviorKills = data['data']['generalStats']['saviorKills'];
        let nemesisStreak = data['data']['generalStats']['nemesisStreak'];
        let roundsWon = data['data']['generalStats']['numWins'];
        let killAssists = data['data']['generalStats']['killAssists'];
        let rush = data['data']['generalStats']['rush'];
        let recon = data['data']['generalStats']['recon'];
        let nemesisKills = data['data']['generalStats']['nemesisKills'];
        let scoreSquad = data['data']['generalStats']['sc_squad'];
        let vehicleDamage = data['data']['generalStats']['vehicleDamage'];
        let CTF = data['data']['generalStats']['capturetheflag'];
        let scoreGeneral = data['data']['generalStats']['sc_general'];
        let headshots = data['data']['generalStats']['headshots'];
        let flagCaptures = data['data']['generalStats']['flagCaptures'];
        let vehicleDestroyed = data['data']['generalStats']['vehiclesDestroyed'];
        let scorePerMinute = data['data']['generalStats']['scorePerMinute'];

        let assault = data['data']['generalStats']['assault'];
        let combatScore = data['data']['generalStats']['combatScore'];
        let avengerKills = data['data']['generalStats']['avengerKills'];
        let awardScore = data['data']['generalStats']['sc_award'];
        let unlockScore = data['data']['generalStats']['sc_unlock'];
        let totalScore = data['data']['generalStats']['totalScore'];
        let carrierAssault = data['data']['generalStats']['carrierassault'];
        let airsuperiority = data['data']['generalStats']['airsuperiority'];
        let elimination = data['data']['generalStats']['elimination'];

        // dodat u profile
        // kills
        let killsAssault = data['data']['generalStats']['kills_assault'];
        let killsEngineer = data['data']['generalStats']['kills_engineer'];
        let killsSupport = data['data']['generalStats']['kills_support'];
        let killsRecon = data['data']['generalStats']['kills_recon'];

        let assaultRifleAccuracy = data['data']['generalStats']['assaultRifleAccuracy'];
        //let engineerRifleAccuracy = data['data']['generalStats']['engineerRifleAccuracy'];
        let supportRifleAccuracy = data['data']['generalStats']['LMGRifleAccuracy'];
        let sniperRifleAccuracy = data['data']['generalStats']['sniperRifleAccuracy'];


        profile.kills = kills.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.time = this.secondsToHms(timePlayed);
        profile.deaths = deahts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.kd = kdRatio;
        profile.killAssists = killAssists.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.KillsPMin = killsPerMinute;
        profile.shotsFired = shotsFired.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.shotsHit = shotsHit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.accuracy = parseFloat(accuracy).toFixed(2).toString();
        profile.wins = roundsWon.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.losses = roundsLost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.roundsPlayed = roundsPlayed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.scorePerMinute = scorePerMinute.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
        profile.rank = rank;
        profile.rankPoints = rankScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.rankImg = "https://eaassets-a.akamaihd.net/bl-cdn/cdnprefix/production-5766-20200917/public/profile/warsaw/gamedata/rank/mediumns/r"+rank+".png";
        let temprank = parseInt(rank) + 1;
        if(temprank != 141)
          profile.rankUpImg ="https://eaassets-a.akamaihd.net/bl-cdn/cdnprefix/production-5766-20200917/public/profile/warsaw/gamedata/rank/mediumns/r"+temprank+".png";

        profile.score = score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.dogtags = dogtagsTaken.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.headshots = headshots.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.suppressionAssists = suppressionAssists.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.longestHeadshot = longestHeadshot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.vehicleDestroyed = vehicleDestroyed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.vehicleDamage = vehicleDamage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        profile.avengerKills = avengerKills.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.saviorKills = saviorKills.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.nemesisKills = nemesisKills.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.killStreak = killStreakBonus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.nemesisStreak = nemesisStreak.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.quits = parseFloat(quitPercentage).toFixed(2);
        profile.skill = skill;
        profile.pointsAssault = assault.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.pointsEngineer = engineer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.pointsSupport = support.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.pointsReacon = recon.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.pointsCommander = commander.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        profile.mcomDefendKills = mcomDefendKills.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.resupplies = resupplies.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.repairs = repairs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.heals = heals.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.revives = revives.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.flagDefends = flagDefends.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.flagCaptures = flagCaptures.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        profile.squadScore = scoreSquad.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.teamScore = scoreTeam.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.vehicleScore = scoreVehicle.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.combatScore = combatScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.generalScore = scoreGeneral.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.awardScore = awardScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.bonusScore = scoreBonus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.unlockScore = unlockScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.rankScore = rankScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.totalScore = totalScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        profile.conquest = conquest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.deathMatch = teamdeathMatch.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.rush = rush.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.domination = domination.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.chainLink = chainLink.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.Ctf = CTF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.obliteration = obliteration.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.carrierAssault = carrierAssault.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.airSuperiority = airsuperiority.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        profile.defuse = elimination.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        let roundPlayed = parseInt(roundsWon) + parseInt(roundsLost);
        profile.roundsPlayed = roundPlayed.toString();
        let wlRatio = roundsWon / roundsLost;
        profile.wlRatio = wlRatio.toFixed(3).toString();

        let shotsFirePerMinute = parseInt(shotsFired) / (parseInt(timePlayed) / 60) ;
        profile.shotsFirePerMinute = shotsFirePerMinute.toFixed(2).toString();

        let headshotKillsPercentage = (parseInt(headshots) / parseInt(kills)) * 100;
        profile.headshotKillsPercentage = headshotKillsPercentage.toFixed(2);

        let killHit = (parseInt(kills) / parseInt(shotsHit)) * 100;
        profile.killHitPercentage = killHit.toFixed(2);

        this.http.getDetails(id).subscribe((data: any) => {
          let da = data['data']['overviewStats'];

          let picture = undefined;
          let platform = undefined;

          if(data['data']['viewedPersonaInfo'] != null) {
            picture = data['data']['viewedPersonaInfo']['picture'];
            // 1 - pc, 32 - ps4, 64 = xbone
            platform = data['data']['viewedPersonaInfo']['platform'];
          } else {
            picture = "//d34ymitoc1pg7m.cloudfront.net/bf4/soldier/xlarge/default-a105f57e.png";
            profile.picture = picture;
          }

          let serviceStarProgressAssault = da['serviceStarsProgress']['1'];
          let serviceStarProgressEngineer = da['serviceStarsProgress']['2'];
          let serviceStarProgressSupport = da['serviceStarsProgress']['32'];
          let serviceStarProgressRecon = da['serviceStarsProgress']['8'];
          let serviceStarProgressCommander = da['serviceStarsProgress']['2048'];

          profile.srsProgressAssault = serviceStarProgressAssault;
          profile.srsProgressEngineer = serviceStarProgressEngineer;
          profile.srsProgressSupport = serviceStarProgressSupport;
          profile.srsProgressReacon = serviceStarProgressRecon;
          profile.srsProgressCommander = serviceStarProgressCommander;

          let array = Object.entries(this.l_xlarge);
          for(let i = 0; i < array.length; i++) {
              if(array[i][0] == picture) {

                profile.picture = "http://d34ymitoc1pg7m.cloudfront.net/bf4/soldier/xlarge/"+array[i][0]+"-"+array[i][1]+".png";
                break;
              }
          }
          array = Object.entries(this.ranks);
          for (let i = 0; i < array.length; i++) {
            console.log("RANK"+profile.rank);
            
            if("RANK"+profile.rank === array[i][0]) {
              profile.currentRankName = array[i][1];
              console.log(profile.rank + 1);
              let rankUp = parseInt(rank) +  1;
           
              
              if(rankUp != 140) {
                console.log(array[i+1][1]);
                
                profile.rankUpName = array[i+1][1];
              }
                

              break;
            }
          }

          if(picture.includes("ch-assault")) {
            picture = "default";
            profile.picture = "http://d34ymitoc1pg7m.cloudfront.net/bf4/soldier/xlarge/default-a105f57e.png";
          }

          profile.platform = platform;

          let serviceStarsAssault = da['serviceStars']['1'];
          let serviceStarsEngineer = da['serviceStars']['2'];
          let serviceStarSupport = da['serviceStars']['32'];
          let serviceStarRecon = da['serviceStars']['8'];
          let serviceStarCommander = da['serviceStars']['2048'];

          profile.srsAssault = serviceStarsAssault;
          profile.srsEngineer = serviceStarsEngineer;
          profile.srsSupport = serviceStarSupport;
          profile.srsReacon = serviceStarRecon;
          profile.srsCommander = serviceStarCommander;

          //gamemodes nije za sve igrace isto
          da = data['data']['overviewStats']['serviceStarsGameModes'];
          let conquestStars = da[0]['serviceStars'];
          let conquestCode = da[0]['codeNeeded'];
          let conquestProgress = da[0]['serviceStarsProgress'];
          let conquestActualValue = da[0]['actualValue'];
          let conquestValueNeeded = da[0]['valueNeeded'];

          let deathmatchStars = da[1]['serviceStars'];
          let deathmatchCode = da[1]['codeNeeded'];
          let deathmatchProgress = da[1]['serviceStarsProgress'];
          let deathmatchActualValue = da[1]['actualValue'];
          let deathmatchValueNeeded = da[1]['valueNeeded'];

          let rushStars = da[2]['serviceStars'];
          let rushCode = da[2]['codeNeeded'];
          let rushProgress = da[2]['serviceStarsProgress'];
          let rushActualValue = da[2]['actualValue'];
          let rushValueNeeded = da[2]['valueNeeded'];

          let obliterationStars = da[3]['serviceStars'];
          let obliterationCode = da[3]['codeNeeded'];
          let obliterationProgress = da[3]['serviceStarsProgress'];
          let obliterationActualValue = da[3]['actualValue'];
          let obliterationValueNeeded = da[3]['valueNeeded'];

          //

          conquestCode = conquestCode.replace("sc_", "").charAt(0).toUpperCase() + conquestCode.replace("sc_", "").slice(1);
          deathmatchCode = deathmatchCode.replace("sc_", "").charAt(0).toUpperCase() + deathmatchCode.replace("sc_", "").slice(1);
          rushCode = rushCode.replace("sc_", "").charAt(0).toUpperCase() + rushCode.replace("sc_", "").slice(1);;
          obliterationCode = obliterationCode.replace("sc_", "").charAt(0).toUpperCase() + obliterationCode.replace("sc_", "").slice(1);;


          profile.conquestStars = conquestStars;
          profile.conquestCode = conquestCode;
          profile.conquestProgress = conquestProgress;
          profile.conquestActualValue = conquestActualValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          profile.conquestValueNeeded = conquestValueNeeded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          profile.deathmatchStars = deathmatchStars;
          profile.deathmatchCode = deathmatchCode;
          profile.deathmatchProgress = deathmatchProgress;
          profile.deathmatchActualValue = deathmatchActualValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          profile.deathmatchValueNeeded = deathmatchValueNeeded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          profile.rushStars = rushStars;
          profile.rushCode = rushCode;
          profile.rushProgress = rushProgress;
          profile.rushActualValue = rushActualValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          profile.rushValueNeeded = rushValueNeeded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          profile.obliterationStars = obliterationStars;
          profile.obliterationCode = obliterationCode;
          profile.obliterationProgress = obliterationProgress;
          profile.obliterationActualValue = obliterationActualValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          profile.obliterationValueNeeded = obliterationValueNeeded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          //
          da = data['data'];
          if(da['activeEmblem'] != null) {
            let emblem = da['activeEmblem']['cdnUrl'];
            emblem = emblem.replace('[SIZE]', '128').replace('[FORMAT]', 'png');
            profile.emblem = emblem;
          }

          let nextRankPointsNeeded = da['nextRankNeeded']['pointsNeeded'];
          let currentRankPointsNeeded = da['currentRankNeeded']['pointsNeeded'];

          let pointsThisRank = nextRankPointsNeeded - currentRankPointsNeeded;
          // 2 - returns medal object
          let medalsUnlocked = da['gameProgress'][2]['current'];
          //
          let rankScore = data['data']['overviewStats']['rankScore'];

          let actualPointsThisRank = nextRankPointsNeeded - rankScore;

          let percentage = ((pointsThisRank-actualPointsThisRank) / pointsThisRank) * 100;
          profile.medalsUnlocked = medalsUnlocked;
          profile.rankUpPercentage = percentage;
          if(profile.rank == 140) {
            profile.rankUpPercentage = 100;
          }
          profile.nextRankPointsNeeded = nextRankPointsNeeded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          profile.rankUpPointsLeft = (nextRankPointsNeeded - rankScore).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          if(serviceStarsAssault == 0) {
            profile.pointsAssaultNeeded = "155,000";
          } else {
            profile.pointsAssaultNeeded = (assault * (1 + ((100 - serviceStarProgressAssault) / 100))).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
          if(serviceStarsEngineer == 0) {
            profile.pointsEngineerNeeded = "131,000";
          } else {
            profile.pointsEngineerNeeded  = (engineer * (1 + ((100 - serviceStarProgressEngineer) / 100))).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
          if(serviceStarSupport == 0) {
            profile.pointsSupportNeeded = "134,000";
          } else {
            profile.pointsSupportNeeded = (support * (1 + ((100 - serviceStarProgressEngineer) / 100))).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
          if(serviceStarRecon == 0) {
            profile.pointsReaconNeeded = "104,000";
          } else {
            profile.pointsReaconNeeded = (recon * (1 + ((100 - serviceStarProgressRecon) / 100))).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
          if(serviceStarCommander == 0) {
            profile.pointsCommanderNeeded = "20,000";
          } else {
            profile.pointsCommanderNeeded = (commander * (1 + ((100 - serviceStarProgressCommander) / 100))).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }

          let currentRibbons = da['gameProgress'][3]['current'];
          profile.ribbonsUnlocked = currentRibbons;

          this.http.getWeapons(id).subscribe((weapons: any) => {
            let weaponStats = weapons['data']['mainWeaponStats'];
            for(let i = 0; i < weaponStats.length; i++) {
              console.log(weaponStats[i]);
              let weapon = new Weapon();
              if(weaponStats[i]['category'] != "Special") {
                weapon.accuracy = weaponStats[i]['accuracy'].toFixed(2)
                weapon.headshots = weaponStats[i]['headshots'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
                weapon.kills = weaponStats[i]['kills'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
                weapon.serviceStar = weaponStats[i]['serviceStars'];
                weapon.serviceStarProgress = weaponStats[i]['serviceStarsProgress'];
                weapon.shotsFired = weaponStats[i]['shotsFired'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
                weapon.shotsHit = weaponStats[i]['shotsHit'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
                weapon.slug = weaponStats[i]['slug'].toUpperCase();
                weapon.time = this.secondsToHms(weaponStats[i]['timeEquipped']);
                this.weapons.push(weapon);
              }
              
            }

            this.weaponsSlice = this.weapons.slice(0, 10);
          });

          this.http.getAwards(id).subscribe((award:any) => {


            let da = award['data']['ribbonAwardByCode'];
            let temp = "r";
            let count = 0;
            for(let i = 1; i <= 45; i++) {
              if(i < 10)
                temp = "r0";
              else
                temp = "r";

              count += parseInt(da[temp+i]['timesTaken']);

            }
            profile.ribbonsCollected = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            da = award['data']['medalAwardByCode'];
            temp = "m";
            let countMedals = 0;
            for(let i = 1; i <= 45; i++) {
              if(i < 10)
                temp = "m0";
              else
                temp = "m";

              countMedals += parseInt(da[temp+i]['timesTaken']);

            }
            profile.medalsCollected = countMedals.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            profile.ribbonsPerRound = (count / roundPlayed).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            this.profile = profile;
            this.loaded = true;
          });

        });



    });


  }

  public showAll() {
    if(!this.showAllToggle) {
      this.weaponsSlice = this.weapons;
      this.showAllToggle = true;
    } else {
      this.weaponsSlice = this.weapons.slice(0, 10);
      this.showAllToggle = false;
    }
  }

  public secondsToHms(d: any) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "";
    return hDisplay + mDisplay;
  }

}
