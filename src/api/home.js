import service from '@/utils/http'

export function httpDashboardCampaignTop10(params) {
    return service({
      url: "/api/report/dashboard/campaign/top10",
      method: "post",
      data: params,
    });
  }
  