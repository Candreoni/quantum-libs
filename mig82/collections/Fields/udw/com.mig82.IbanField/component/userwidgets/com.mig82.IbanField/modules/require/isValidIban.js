define(function () {

	const ibanLen = {
		NO:15, BE:16, DK:18, FI:18, FO:18, GL:18, NL:18, MK:19,
		SI:19, AT:20, BA:20, EE:20, KZ:20, LT:20, LU:20, CR:21,
		CH:21, HR:21, LI:21, LV:21, BG:22, BH:22, DE:22, GB:22,
		GE:22, IE:22, ME:22, RS:22, AE:23, GI:23, IL:23, AD:24,
		CZ:24, ES:24, MD:24, PK:24, RO:24, SA:24, SE:24, SK:24,
		VG:24, TN:24, PT:25, IS:26, TR:26, FR:27, GR:27, IT:27,
		MC:27, MR:27, SM:27, AL:28, AZ:28, CY:28, DO:28, GT:28,
		HU:28, LB:28, PL:28, BR:29, PS:29, KW:30, MU:30, MT:31
	};

	function isValid(iban) {
		iban = iban.replace(/\s/g, '');
		if (!iban.match(/^[\dA-Z]+$/)) {
			return false;
		}
		var len = iban.length;
		if (len !== ibanLen[iban.substr(0,2)]) {
			return false;
		}
		var reversed = iban.substr(4) + iban.substr(0,4);
		//kony.print("IBAN: %s".debug, iban);
		kony.print(`IBAN: ${iban}\n      ${reversed}`);

		var s = "";
		for (var i=0; i < len; i+=1){
			s += parseInt(reversed.charAt(i),36);
			//kony.print("\ts: %s\n".debug, s);
		}

		for (var m = s.substr(0,15)%97, s = s.substr(15); s; s=s.substr(13)) {
			m=(m+s.substr(0,13))%97;
			//kony.print("\tm: %s\n".debug, m);
		}
		return m == 1;
	}
    return isValid;
});
