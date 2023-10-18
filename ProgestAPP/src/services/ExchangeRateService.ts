import API from 'apiConfig';
import ExchangeRateItem from 'interfaces/ExchangeRateItem';

const ExchangeRateService = {
    get: (startDate: string, endDate: string) => new Promise<ExchangeRateItem[]>(
        (resolve, reject) => {
          API.get(`ExchangeRate/?startDate=${startDate}&endDate=${endDate}`)
            .then(
              res => resolve(res.data)
            )
            .catch(
              err => reject(err)
            );
        }
    )
}

export default ExchangeRateService;