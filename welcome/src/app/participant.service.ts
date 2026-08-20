import { Injectable } from '@angular/core';

export type ParticipantBatch = 'LD' | 'FINANCE';

export interface Participant {
  email: string;
  batch: ParticipantBatch;
  country: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private readonly participants: Participant[] = [
    { email: 'ayat.zanaty@holcim.com ', batch: 'LD', country: 'Egypt' },

    { email: 'imadeddine.charif@lafarge.com', batch: 'LD', country: 'Algeria' },
        { email: 'imadeddine.charif@holcim.com', batch: 'LD', country: 'Algeria' },

    { email: 'brahim.amir@lafarge.com', batch: 'LD', country: 'Algeria' },
        { email: 'brahim.amir@holcim.com', batch: 'LD', country: 'Algeria' },

    { email: 'mostafa.aissaoui@lafarge.com', batch: 'LD', country: 'Algeria' },
        { email: 'mostafa.aissaoui@holcim.com', batch: 'LD', country: 'Algeria' },

    { email: 'simon.ndo@holcim.com', batch: 'LD', country: 'Cameroon' },
    { email: 'boris.yebga@holcim.com', batch: 'LD', country: 'Cameroon' },
    { email: 'haifu.wu@holcim.com', batch: 'LD', country: 'China' },
    { email: 'kezhen.yu@holcim.com', batch: 'LD', country: 'China' },
    { email: 'ahmed.yossry@holcim.com', batch: 'LD', country: 'Egypt' },
    { email: 'badawy.ahmed@holcim.com', batch: 'LD', country: 'Egypt' },
    { email: 'amr.attia@holcim.com', batch: 'LD', country: 'Egypt' },
    { email: 'rezhin.taimoor@lafarge.com', batch: 'LD', country: 'Iraq' },
        { email: 'rezhin.taimoor@holcim.com', batch: 'LD', country: 'Iraq' },
    { email: 'lava.mohamed@holcim.com', batch: 'LD', country: 'Iraq' },

    { email: 'lava.mohamed@lafarge.com', batch: 'LD', country: 'Iraq' },
    { email: 'renefabrice.djenontin@holcim.com', batch: 'LD', country: 'Ivory Coast' },
    { email: 'abdelfattah.aitbzou@lafargeholcim.com', batch: 'LD', country: 'Morocco' },
    { email: 'amine.mnaouer@lafargeholcim.com', batch: 'LD', country: 'Morocco' },
    { email: 'mohamed.fanane@lafargeholcim.com', batch: 'LD', country: 'Morocco' },
    { email: 'ameeruddin.mohammad@holcim.com', batch: 'LD', country: 'Qatar' },
    { email: 'samir.hasan-zade@holcim.com', batch: 'LD', country: 'Azerbaijan' },
    { email: 'kalai.mariappan@holcim.com', batch: 'LD', country: 'Philippines' },
    { email: 'francis.echavez@holcim.com', batch: 'LD', country: 'Philippines' },
    { email: 'ali.farouq.ext@holcim.com', batch: 'LD', country: 'Egypt' },
    { email: 'habib.botros@holcim.com', batch: 'LD', country: 'Egypt' },
    { email: 'hadeer.hamada@holcim.com', batch: 'LD', country: 'Egypt' },
    { email: 'alielsafty343@gmail.com', batch: 'LD', country: 'Egypt' },
    { email: 'mounia.otarid@holcim.com', batch: 'LD', country: 'Morocco' },
    { email: 'walaa.maaty@lafarge.com', batch: 'LD', country: 'Egypt' },
    { email: 'akram.mahmoud@lafarge.com', batch: 'LD', country: 'Egypt' },
    { email: 'emily.john@lafarge.com', batch: 'LD', country: 'Egypt' },
    { email: 'amr.salem@holcim.com', batch: 'LD', country: 'Egypt' },
    { email: 'david.fauvet@holcim.com', batch: 'LD', country: 'France' },
    { email: 'bhogendra.mishra@holcim.com', batch: 'LD', country: 'India', displayName: 'B.K' },
    { email: 'najib.ribi@holcim.com', batch: 'LD', country: 'Morocco' },
    { email: 'rajesh.sunar@holcim.com', batch: 'FINANCE', country: 'Egypt' },
    { email: 'steffen.kindler@holcim.com', batch: 'FINANCE', country: 'Egypt' },
    { email: 'emily.elias@lafarge.com', batch: 'FINANCE', country: 'Egypt' },
    { email: 'madeleine.you@holcim.com', batch: 'FINANCE', country: 'Egypt' }
  ];

  findByEmail(email: string | null | undefined): Participant | undefined {
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail) {
      return undefined;
    }

    return this.participants.find(participant => participant.email === normalizedEmail);
  }

  getBatch(email: string | null | undefined): ParticipantBatch | 'NONE' {
    return this.findByEmail(email)?.batch ?? 'NONE';
  }
}
