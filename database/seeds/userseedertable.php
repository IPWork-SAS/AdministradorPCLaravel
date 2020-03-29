<?php

use Illuminate\Database\Seeder;
use App\User;

class userseedertable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = 'Ermita';
        $user->email = 'admin@ermita.com';
        $user->password = '3rm1t42019';
        $user->database = 'portal_oxohotel';
        $user->imgdashboard = 'oxohotel.png';
        $user->dashboard = "/app/locations";
        $user->location = 0;
        $user->campaing = 0;
        $user->id_rol = 1;
        $user->save();

        $user = new User();
        $user->name = 'Unicentro';
        $user->email = 'admin@unicentro.com';
        $user->password = 'Un1c3ntr0.2019';
        $user->database = 'unicentro';
        $user->imgdashboard = 'unicentro.png';
        $user->dashboard = "/app/locations";
        $user->location = 0;
        $user->campaing = 0;
        $user->id_rol = 1;
        $user->save();

        $user = new User();
        $user->name = 'IPfi Admin';
        $user->email = 'mauricio.pascuas@ipwork.com.co';
        $user->password = 'IPwork2019.';
        $user->database = 'unicentro';
        $user->imgdashboard = 'ipfi.png';
        $user->dashboard = "/app/locations";
        $user->location = 0;
        $user->campaing = 0;
        $user->id_rol = 1;
        $user->save();

        $user = new User();
        $user->name = 'Locations Admin';
        $user->email = 'locations@ermita.com';
        $user->password = 'l0c4t10n3rm1t4';
        $user->database = 'portal_oxohotel';
        $user->imgdashboard = 'oxohotel.png';
        $user->dashboard = "/app/locations/Primera Locacion";
        $user->location = 1;
        $user->campaing = 0;
        $user->id_rol = 2;
        $user->save();

        $user = new User();
        $user->name = 'Vouchers Admin';
        $user->email = 'voucher@ermita.com';
        $user->password = 'v0uch3r3rm1t4';
        $user->database = 'portal_oxohotel';
        $user->imgdashboard = 'oxohotel.png';
        $user->dashboard = "/app/locations/Primera Locacion/vouchers";
        $user->location = 1;
        $user->campaing = 0;
        $user->id_rol = 4;
        $user->save();

        $user = new User();
        $user->name = 'Diego Barreiro';
        $user->email = 'dbarreiro@oxohotel.com';
        $user->password = 'Is44c2020%';
        $user->database = 'portal_oxohotel';
        $user->imgdashboard = 'oxohotel.png';
        $user->dashboard = "/app/locationes/";
        $user->location = 0;
        $user->campaing = 0;
        $user->id_rol = 1;
        $user->save();

        $user = new User();
        $user->name = 'jheredia';
        $user->email = 'jheredia@oxohotel.com';
        $user->password = 'jh3r3d14*.';
        $user->database = 'portal_oxohotel';
        $user->imgdashboard = 'oxohotel.png';
        $user->dashboard = "/app/locations";
        $user->location = 0;
        $user->campaing = 0;
        $user->id_rol = 1;
        $user->save();

        $user = new User();
        $user->name = 'ticermita';
        $user->email = 'ticermita@oxohotel.com';
        $user->password = 't1c3rm1t4*.';
        $user->database = 'portal_oxohotel';
        $user->imgdashboard = 'oxohotel.png';
        $user->dashboard = "/app/locations/Hotel Ermita";
        $user->location = 1;
        $user->campaing = 0;
        $user->id_rol = 2;
        $user->save();

        $user = new User();
        $user->name = 'ticctg';
        $user->email = 'ticctg@oxohotel.com';
        $user->password = 't1cctg*.';
        $user->database = 'portal_oxohotel';
        $user->imgdashboard = 'oxohotel.png';
        $user->dashboard = "/app/locations/Santa Catalina";
        $user->location = 2;
        $user->campaing = 0;
        $user->id_rol = 2;
        $user->save();
    }
}
