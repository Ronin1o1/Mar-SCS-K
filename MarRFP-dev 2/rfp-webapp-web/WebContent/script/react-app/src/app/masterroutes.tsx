import React from "react";

const UpdateContactInfo = React.lazy(
  () => import("./homepage/UpdateContactInfo/Admin/content/UpdateContactInfo")
);
const SupportInfo = React.lazy(
  () => import("./homepage/supportInfo/content/SupportInfo")
);
const SignOut = React.lazy(() => import("./homepage/signOut/content/SignOut"));
const AdminNews = React.lazy(
  () => import("./pricing/admin/news/content/NewsList")
);
const AccountMaintenance = React.lazy(
  () => import("./pricing/admin/accountMaintenance")
);
const BedTypeMaintenance = React.lazy(
  () => import("./pricing/admin/BedTypeMaintenance/content/BedTypeMaintenance")
);
const CBCPeriodMaintenance = React.lazy(
  () =>
    import("./pricing/admin/CBCPeriodMaintenance/content/CBCPeriodMaintenance")
);
const PeriodMaintenance = React.lazy(
  () => import("./pricing/admin/PeriodMaintenance/content/PeriodMaintenance")
);
const AccountStatusListWrapper = React.lazy(
  () => import("./pricing/portfolio/AccountStatus/content/AccountStatusList")
);
const CopyAccount = React.lazy(
  () => import("./pricing/admin/AccountTier/content/AccountTier")
);
const RateProductHotelView = React.lazy(
  () =>
    import(
      "./roomRateDescriptions/hotelFormattedRateDescription/content/ViewRateDescription/content/RateProductHotelView"
    )
);
const ModifyRateDescription = React.lazy(
  () =>
    import(
      "./roomRateDescriptions/hotelFormattedRateDescription/content/modifyRateProductDescription/content/ModifyRateDescription"
    )
);
import HotelPGOOSMaintenanceWrapper from "./pricing/admin/hotelPGOOSMaintenance/HotelPGOOSMaintenanceWrapper";
const HotelMirrorList = React.lazy(
  () => import("./pricing/admin/hotelMirrorList/content/HotelMirrorList")
);
const RoomTypeMaintenance = React.lazy(
  () =>
    import("./pricing/admin/RoomTypeMaintenance/content/RoomTypeMaintenance")
);
const PASAccount = React.lazy(
  () => import("./pricing/admin/linkPASAccount/content/PASAccount")
);
const SappAccount = React.lazy(
  () => import("./pricing/admin/CopySappAccount/content/SappAccount")
);
import HotelPropertyListWrapper from "./pricing/hotelPropertyList";
import CBCRequestWrapper from "./pricing/portfolio/CBCrequest";
import PortfolioCBCStatusWrapper from "./pricing/portfolio/CBCStatus";
import PortfolioOrganizationWrapper from "./pricing/portfolio/portfolioOrganization";
import PortfolioRebidWrapper from "./pricing/portfolio/rebid";
import PortfolioAcceptanceWrapper from "./pricing/portfolio/portfolioAcceptances";
import PgoosPropagationWrapper, {
  PgoosPropagationFinishWrapper,
} from "./pricing/pgoos/PGOOSPropagation";
import GPPPGOOSMaintenanceWrapper from "./pricing/pgoos/GPPPGOOSMaintenance";

import ViewEdieReportsWrapper from "./pricing/edie/ViewEdieReports";
import RequestEdieWrapper from "./pricing/edie/requestEdie";
const EDIEColumnDescrition = React.lazy(
  () =>
    import("./pricing/edie/EDIEColumnDescription/content/EDIEColumnDescription")
);
const ProfileList = React.lazy(
  () => import("./pricing/edie/fieldProfile/profileList/content/profileList")
);
import RequestReportWrapper from "./pricing/reports/requestReport";
import HotelPricing from "./pricing/hotelPricing";
import EdieHotelProfileList from "./pricing/edie/edieHotelProfile/content/EdieHotelProfileList";
const TermsAndConditions = React.lazy(
  () => import("./homepage/TermsandConditions/content/TermsAndConditions")
);
const RoomDescriptionRules = React.lazy(
  () => import("./roomRateDescriptions/admin/displayrules/roomDescriptionRules")
);
const FormattedRoomNameRules = React.lazy(
  () => import("./roomRateDescriptions/admin/displayrules/formattedRoomName")
);
const RateProductRules = React.lazy(
  () => import("./roomRateDescriptions/admin/displayrules/rateProductRules")
);
const RoomDescriptionText = React.lazy(
  () => import("./roomRateDescriptions/displayText/roomDescription")
);
const FormattedRoomNameText = React.lazy(
  () => import("./roomRateDescriptions/displayText/formattedRoomName")
);
const RateProductText = React.lazy(
  () => import("./roomRateDescriptions/displayText/RateProduct")
);
const GeneralNewsList = React.lazy(
  () => import("./generaladmin/news/content/NewsList")
);
const HotelFormattedRoomNames = React.lazy(
  () => import("./roomRateDescriptions/hotelFormattedRoomNames")
);
const MasterFormattedRoomNames = React.lazy(
  () =>
    import(
      "./roomRateDescriptions/masterFormattedRoomNames/masterFarmattedRoomNames"
    )
);
const HotelFormattedDescription = React.lazy(
  () => import("./roomRateDescriptions/hotelFormattedRateDescription")
);
const UserEdit = React.lazy(
  () => import("./generaladmin/userproperties/hotelusers/content/UserEdit")
);
import HotelUsers from "./generaladmin/userproperties/hotelusers";
import HotelSolicitationWrapper from "./pricing/portfolio/hotelSolicitation";
import PortfolioSelectionWrapper from "./pricing/portfolio/portfolioSelection";
import RequestSpecialReportsWrapper from "./pricing/admin/RequestSpecialReports";

import { EdieHotelProfileView } from "./pricing/edie/edieHotelProfile/content/EdieHotelProfileView";
import { MarshaSearchFilters } from "./generaladmin/userproperties/hotelusers/content/MarshaSearchFilters";
import { CopySearchFilter } from "./generaladmin/userproperties/hotelusers/content/CopySearchFilter";
import { SalesFilters } from "./generaladmin/userproperties/salesusers/content/SalesFilters";
import { CopySalesSearchFilter } from "./generaladmin/userproperties/salesusers/content/CopySalesSearchFilter";
import { UpdateMultipleHotels } from "./pricing/admin/UpdateMultipleHotels/content/UpdateMultipleHotels";

const MultipleBlackouts = React.lazy(
  () =>
    import(
      "./pricing/hotelPricing/content/MultipleBlackout/content/MultipleBlackouts"
    )
);
const ViewReports = React.lazy(
  () => import("./pricing/admin/ViewReports/content/ViewReports")
);
const AddProfile = React.lazy(
  () => import("./pricing/edie/fieldProfile/addProfile/content/addProfile")
);
const EditProfile = React.lazy(
  () => import("./pricing/edie/fieldProfile/editProfile/content/editProfile")
);
const EdieHotelProfileAdd = React.lazy(
  () => import("./pricing/edie/edieHotelProfile/content/EdieHotelProfileAdd")
);
const EdieHotelProfileName = React.lazy(
  () => import("./pricing/edie/edieHotelProfile/content/EdieHotelProfileName")
);
const RoomRateNews = React.lazy(
  () => import("./roomRateDescriptions/news/content/NewsList")
);
const CopyGridContent = React.lazy(
  () =>
    import("./generaladmin/userproperties/hotelusers/content/CopyGridContent")
);
const SalesUsers = React.lazy(
  () => import("./generaladmin/userproperties/salesusers")
);
const LimitedSalesUsers = React.lazy(
  () => import("./generaladmin/userproperties/limitedSalesUsers")
);
const GeneralViewReports = React.lazy(
  () => import("./generaladmin/ViewReports/content/GeneralAdminViewReports")
);
const ViewAccountPlanSappReport = React.lazy(
  () =>
    import(
      "./pricing/salesAdministration/ViewAccountPlanSappReport/content/ViewAccountPlanSappReport"
    )
);
const accBTProfileList = React.lazy(
  () =>
    import(
      "./pricing/salesAdministration/content/accBTProfile/content/accBTProfileList"
    )
);
const SalesAdmin = React.lazy(() => import("./pricing/salesAdministration"));
const HotelRoomDesc = React.lazy(
  () => import("./roomRateDescriptions/hotelRoomDesc")
);
const CentralPricingAccountRegistrationWrapper = React.lazy(
  () =>
    import("./pricing/salesAdministration/centralPricingAccountRegistration")
);
const UserEditSales = React.lazy(
  () => import("./generaladmin/userproperties/salesusers/content/UserEditSales")
);
const CopySalesGridContent = React.lazy(
  () =>
    import(
      "./generaladmin/userproperties/salesusers/content/CopySalesGridContent"
    )
);
const AdminUsers = React.lazy(
  () => import("./generaladmin/userproperties/adminUsers/content/AdminUsers")
);
const RoomRateDescAdminUsers = React.lazy(
  () =>
    import(
      "./generaladmin/userproperties/roomRateDescriptionAdminUsers/content/RoomRateDescAdminUsers"
    )
);
const SalesUpdateContactInfo = React.lazy(
  () =>
    import("./homepage/UpdateContactInfo/Others/content/SalesUpdateContactInfo")
);
const SynchronizeUsers = React.lazy(
  () => import("./generaladmin/synchronizeUsers/content/SynchronizeUsers")
);
const BTGroup = React.lazy(
  () => import("./pricing/hotelPricing/content/BTAccountRates/content/BTGroup")
);
const RateDescriptionProductDefinition = React.lazy(
  () =>
    import(
      "./roomRateDescriptions/hotelFormattedRateDescription/content/modifyRateProductDescription/content/RateDescriptionProductDefinition"
    )
);
const AccountInitiatives = React.lazy(
  () =>
    import(
      "./pricing/salesAdministration/content/accountInitiatives/content/AccountInitiatives"
    )
);
const UserEditLimitedSales = React.lazy(
  () =>
    import(
      "./generaladmin/userproperties/limitedSalesUsers/content/UserEditLimitedSales"
    )
);
const modifyRateDescriptions = React.lazy(
  () =>
    import(
      "./roomRateDescriptions/masterFormattedRateDescriptions/content/modifyRateDescriptions"
    )
);
const createProduct = React.lazy(
  () =>
    import(
      "./roomRateDescriptions/masterFormattedRateDescriptions/content/createProduct"
    )
);
const finishAndSave = React.lazy(
  () =>
    import(
      "./roomRateDescriptions/masterFormattedRateDescriptions/content/finishAndSave"
    )
);
const GARequestSpecialReports = React.lazy(
  () =>
    import("./generaladmin/RequestSpecialReports/content/RequestSpecialReports")
);
const KorAdminUsers = React.lazy(
  () =>
    import("./generaladmin/userproperties/korAdminUsers/content/KorAdminUsers")
);
const DbMarshaUsers = React.lazy(
  () =>
    import("./generaladmin/userproperties/dbMarshaUsers/content/dbMarshaUsers")
);
const AccountPlanUsers = React.lazy(
  () =>
    import(
      "./generaladmin/userproperties/accountPlanUsers/content/accountPlanUsers"
    )
);
const ReadOnlyUsers = React.lazy(
  () =>
    import("./generaladmin/userproperties/readOnlyUsers/content/readOnlyUsers")
);
const ExtendedStay = React.lazy(
  () =>
    import(
      "./pricing/salesAdministration/content/extendedStay/content/extendedStay"
    )
);
const Catering = React.lazy(
  () =>
    import("./pricing/salesAdministration/content/catering/content/catering")
);
const FixedSeasons = React.lazy(
  () =>
    import("./pricing/hotelPricing/content/FixedSeasons/content/FixedSeasons")
);
const GeneralAccountOverview = React.lazy(
  () =>
    import(
      "./pricing/salesAdministration/content/generalAccountOverview/content/GeneralAccountOverview"
    )
);
const Leisure = React.lazy(
  () => import("./pricing/salesAdministration/content/leisure/content/leisure")
);
const BrandFormattedRateDescriptions = React.lazy(
  () => import("./roomRateDescriptions/brandFormattedRateDescription")
);
const RateProductBrandDefinition = React.lazy(
  () =>
    import(
      "./roomRateDescriptions/brandFormattedRateDescription/content/RateProductBrandDefinition"
    )
);
const masterFormattedRateProductDescription = React.lazy(
  () =>
    import(
      "./roomRateDescriptions/masterFormattedRateDescriptions/content/masterFormattedRateProductDescription"
    )
);
const DirectReports = React.lazy(
  () => import("./pricing/hotelPricing/content/Reports/content/DirectReport")
);
const SendAdditionalEmailHotel = React.lazy(
  () => import("./shared/components/sendAdditionalEmailHotel")
);
const NoPrivilege = React.lazy(() => import("./shared/components/NoPrivilege"));

const masterRoutes = [
  {
    path: "/sendAdditionalInfo",
    component: SendAdditionalEmailHotel,
  },
  {
    path: "/roomdefhotelselect",
    component: HotelRoomDesc,
  },
  {
    path: "/updatecontactinfo",
    component: UpdateContactInfo,
  },
  {
    path: "/salesupdatecontactinfo",
    component: SalesUpdateContactInfo,
  },
  {
    path: "/terms",
    component: TermsAndConditions,
  },
  {
    path: "/support",
    component: SupportInfo,
  },
  {
    path: "/signOut",
    component: SignOut,
  },
  {
    path: "/pricingnews",
    component: AdminNews,
  },
  {
    path: "/bedtypemaintenance",
    component: BedTypeMaintenance,
  },
  {
    path: "/cbcpricingperiodmaintenance",
    component: CBCPeriodMaintenance,
  },
  {
    path: "/pricingperiodmaintenance",
    component: PeriodMaintenance,
  },
  {
    path: "/accountstatus",
    component: AccountStatusListWrapper,
  },
  {
    path: "/hotelpgoosmaint",
    component: HotelPGOOSMaintenanceWrapper,
  },
  {
    path: "/hotelmirrorlist",
    component: HotelMirrorList,
  },
  {
    path: "/roomtypemaintenance",
    component: RoomTypeMaintenance,
  },
  {
    path: "/linkpasaccounts",
    component: PASAccount,
  },
  {
    path: "/copysappaccount",
    component: SappAccount,
  },
  {
    path: "/propertylist",
    component: HotelPropertyListWrapper,
  },
  {
    path: "/multihotelaccountcenter",
    component: UpdateMultipleHotels,
  },
  {
    path: "/cbcrequest",
    component: CBCRequestWrapper,
  },
  {
    path: "/hotelsolicitation",
    component: HotelSolicitationWrapper,
  },
  {
    path: "/portfolioselection",
    component: PortfolioSelectionWrapper,
  },
  {
    path: "/cbcstatus",
    component: PortfolioCBCStatusWrapper,
  },
  {
    path: "/portfolioorganization",
    component: PortfolioOrganizationWrapper,
  },
  {
    path: "/portfoliorebid",
    component: PortfolioRebidWrapper,
  },
  {
    path: "/portfoliostatus",
    component: PortfolioAcceptanceWrapper,
  },
  {
    path: "/pgoospropagation",
    component: PgoosPropagationWrapper,
  },
  {
    path: "/pgoospropagationfinish",
    component: PgoosPropagationFinishWrapper,
  },
  {
    path: "/gpppgoosstatus",
    component: GPPPGOOSMaintenanceWrapper,
  },
  {
    path: "/viewediereports",
    component: ViewEdieReportsWrapper,
  },
  {
    path: "/requestediereport",
    component: RequestEdieWrapper,
  },
  {
    path: "/editediehotelprofile",
    component: EdieHotelProfileList,
  },
  {
    path: "/edieHotelProfileAdd",
    component: EdieHotelProfileAdd,
  },
  {
    path: "/edieHotelProfileName",
    component: EdieHotelProfileName,
  },
  {
    path: "/edieHotelProfileView/:profile_id/:profile_name",
    component: EdieHotelProfileView,
  },
  {
    path: "/editediefieldprofile",
    component: ProfileList,
  },
  {
    path: "/addProfile",
    component: AddProfile,
  },
  {
    path: "/editProfile/:id",
    component: EditProfile,
  },
  {
    path: "/editediecolumndescription",
    component: EDIEColumnDescrition,
  },
  {
    path: "/viewreports",
    component: ViewReports,
  },
  {
    path: "/requestreports",
    component: RequestReportWrapper,
  },
  {
    path: "/requestspecialreports",
    component: RequestSpecialReportsWrapper,
  },
  {
    path: "/pricinghotelselect",
    component: HotelPricing,
  },
  {
    path: "/garequestspecialreports",
    component: GARequestSpecialReports,
  },

  {
    path: "/accountmaintenance",
    component: AccountMaintenance,
  },
  {
    path: "/copyAccountInfoBySegment",
    component: CopyAccount,
  },
  {
    path: "/roomdefrules",
    component: RoomDescriptionRules,
  },
  {
    path: "/roomtypenamerules",
    component: FormattedRoomNameRules,
  },
  {
    path: "/rateproductrules",
    component: RateProductRules,
  },
  {
    path: "/roomdeftext",
    component: RoomDescriptionText,
  },
  {
    path: "/roomtypenametext",
    component: FormattedRoomNameText,
  },
  {
    path: "/rateproducttext",
    component: RateProductText,
  },
  {
    path: "/generalnews",
    component: GeneralNewsList,
  },
  {
    path: "/useredithotelaccess",
    component: UserEdit,
  },
  {
    path: "/roomtypenamehotelselect",
    component: HotelFormattedRoomNames,
  },
  {
    path: "/roomtypenamemasterroompool",
    component: MasterFormattedRoomNames,
  },
  {
    path: "/rateproducthotelselect",
    component: HotelFormattedDescription,
  },
  {
    path: "/rateproducthotelview",
    component: RateProductHotelView,
  },
  {
    path: "/rateproducthotelsearch",
    component: ModifyRateDescription,
  },
  {
    path: "/rateproducthoteldefinition",
    component: RateDescriptionProductDefinition,
  },
  {
    path: "/hotelusers",
    component: HotelUsers,
  },
  {
    path: "/salesusers",
    component: SalesUsers,
  },
  {
    path: "/limitedsalesusers",
    component: LimitedSalesUsers,
  },
  {
    path: "/adminusers",
    component: AdminUsers,
  },
  {
    path: "/multipleblackouts",
    component: MultipleBlackouts,
  },
  {
    path: "/btAccountRates",
    component: BTGroup,
  },
  {
    path: "/editaccountplansapp",
    component: SalesAdmin,
  },
  {
    path: "/accBTProfileList",
    component: accBTProfileList,
  },
  {
    path: "/rdnews",
    component: RoomRateNews,
  },
  {
    path: "/marshasearchfilters",
    component: MarshaSearchFilters,
  },
  {
    path: "/copygridcontent",
    component: CopyGridContent,
  },
  {
    path: "/copysearchfilter",
    component: CopySearchFilter,
  },
  {
    path: "/viewaccountplansappreport",
    component: ViewAccountPlanSappReport,
  },
  {
    path: "/generalviewreports",
    component: GeneralViewReports,
  },
  {
    path: "/centralpricingaccountregistration",
    component: CentralPricingAccountRegistrationWrapper,
  },
  {
    path: "/usereditsalesaccess",
    component: UserEditSales,
  },
  {
    path: "/salesfilters",
    component: SalesFilters,
  },
  {
    path: "/copysalesgridcontent",
    component: CopySalesGridContent,
  },
  {
    path: "/copysalesearchfilter",
    component: CopySalesSearchFilter,
  },
  {
    path: "/usereditlimitedsalesaccess",
    component: UserEditLimitedSales,
  },
  {
    path: "/roomratedescriptionadminusers",
    component: RoomRateDescAdminUsers,
  },
  {
    path: "/error",
    component: Error,
  },
  {
    path: "/noPrivilege",
    component: NoPrivilege,
  },
  {
    path: "/synchronize/view",
    component: SynchronizeUsers,
  },
  {
    path: "/modifyRateDescriptions",
    component: modifyRateDescriptions,
  },
  {
    path: "/createProduct",
    component: createProduct,
  },
  // {
  //   path: "/defineProduct",
  //   component: ,
  // },
  {
    path: "/catering",
    component: Catering,
  },
  {
    path: "/accountInitiatives",
    component: AccountInitiatives,
  },
  {
    path: "/finishAndSave",
    component: finishAndSave,
  },
  {
    path: "/koradminusers",
    component: KorAdminUsers,
  },
  {
    path: "/dbmarshausers",
    component: DbMarshaUsers,
  },
  {
    path: "/accountplanusers",
    component: AccountPlanUsers,
  },
  {
    path: "/readonlyusers",
    component: ReadOnlyUsers,
  },
  {
    path: "/Seasons",
    component: FixedSeasons,
  },
  {
    path: "/acctoverview",
    component: GeneralAccountOverview,
  },
  {
    path: "/extendedStay",
    component: ExtendedStay,
  },
  {
    path: "/leisure",
    component: Leisure,
  },
  {
    path: "/rateproductbrandselect",
    component: BrandFormattedRateDescriptions,
  },
  {
    path: "/rateproductbranddefinition",
    component: RateProductBrandDefinition,
  },
  {
    path: "/defineProduct",
    component: masterFormattedRateProductDescription,
  },
  {
    path: "/hotelReports",
    component: DirectReports,
  },
];

export default masterRoutes;
